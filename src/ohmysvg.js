import Rsvg from "gi://Rsvg";
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import { send, read } from "./ipc.js";

import { optimize } from "./svgo.js";
import { debug } from "./util.js";

const ByteArray = imports.byteArray;

const CHECK_SIZE = 32;
export const CANVAS_PADDING = 32;

export function process({ string_original, config }) {
  const result = optimize(string_original, config);

  const {
    data: string_optimized,
    info: { width, height },
  } = result;
  const data_optimized = ByteArray.fromString(string_optimized);
  debug("svgo", width, height);

  const handle = Rsvg.Handle.new_from_data(data_optimized);
  // FIXME: doc says to set dpi but whay and why?
  // isn't the default good enough?
  // handle.set_dpi()
  const dimensions = handle.get_dimensions();
  debug("librsvg", dimensions.width, dimensions.height);

  return {
    handle,
    dimensions,
    data_optimized,
  };
}

export function drawCheckerboard(cr, x, y, width, height) {
  let i, j;

  cr.rectangle(x, y, width, height);
  cr.setSourceRGB(0.4, 0.4, 0.4);
  cr.fill();

  /* Only works for CHECK_SIZE a power of 2 */
  j = x & -CHECK_SIZE;

  for (; j < height; j += CHECK_SIZE) {
    i = y & -CHECK_SIZE;
    for (; i < width; i += CHECK_SIZE)
      if ((i / CHECK_SIZE + j / CHECK_SIZE) % 2 === 0)
        cr.rectangle(i, j, CHECK_SIZE, CHECK_SIZE);
  }

  cr.setSourceRGB(0.7, 0.7, 0.7);
  cr.fill();
}

export function drawHandle(
  cr,
  handle,
  drawing_area_width,
  drawing_area_height,
) {
  const width = drawing_area_width - CANVAS_PADDING;
  const height = drawing_area_height - CANVAS_PADDING;

  const x = (drawing_area_width - width) / 2;
  const y = (drawing_area_height - height) / 2;

  handle.render_document(cr, new Rsvg.Rectangle({ x, y, width, height }));
}

// Ideally we would use the same GJS path for the worker as for the main process
// but I couldn't find a way. There is a WIP for system.execPath though
// https://gitlab.gnome.org/GNOME/gjs/-/issues/373
const proc = Gio.Subprocess.new(
  ["gjs", "-m", "./src/worker.js"],
  Gio.SubprocessFlags.STDIN_PIPE | Gio.SubprocessFlags.STDOUT_PIPE,
);
const stdin = new Gio.DataOutputStream({
  base_stream: proc.get_stdin_pipe(),
});

const stdout = new Gio.DataInputStream({
  base_stream: proc.get_stdout_pipe(),
});
const source = stdout.base_stream.create_source(null);
// source.set_callback(() => {
//   const message = read(stdout);
//   log(["tyran received", JSON.stringify(message)]);
//   return GLib.SOURCE_CONTINUE;
// });

let callback = () => {};

source.attach(null);
source.set_callback(() => {
  const result = read(stdout);
  log(["tyran received", JSON.stringify(result)]);

  const {
    data: string_optimized,
    info: { width, height },
  } = result;
  const data_optimized = ByteArray.fromString(string_optimized);
  debug("svgo", width, height);

  const handle = Rsvg.Handle.new_from_data(data_optimized);
  // FIXME: doc says to set dpi but whay and why?
  // isn't the default good enough?
  // handle.set_dpi()
  const dimensions = handle.get_dimensions();
  debug("librsvg", dimensions.width, dimensions.height);

  log("yey");

  callback({ handle, data_optimized });

  return GLib.SOURCE_CONTINUE;
});

export async function processOOP({ string_original, config, cb }) {
  callback = cb;
  send(stdin, [string_original, config]);

  // return {
  //   handle,
  //   dimensions,
  //   data_optimized,
  // };
}
