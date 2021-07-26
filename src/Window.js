import Gtk from "gi://Gtk";
import GLib from "gi://GLib";
import Gio from "gi://Gio";

import { relativePath, debug } from "./util.js";
import { defaultPlugins } from "./svgo.js";
import Plugins from "./Plugins.js";
import {
  drawCheckerboard,
  drawHandle,
  process,
  processOOP,
} from "./ohmysvg.js";
import DialogSave from "./DialogSave.js";
import DialogOpen from "./DialogOpen.js";

const ByteArray = imports.byteArray;

export default function Window({ application }) {
  const builder = Gtk.Builder.new_from_file(relativePath("./window.ui"));

  const window = builder.get_object("window");
  window.set_application(application);

  const action_open = new Gio.SimpleAction({
    name: "open",
    parameter_type: null,
  });
  action_open.connect("activate", () => {
    DialogOpen({ window, onFile: openFile });
  });
  window.add_action(action_open);

  const action_save = new Gio.SimpleAction({
    name: "save",
    parameter_type: null,
  });
  action_save.connect("activate", () => {
    DialogSave({ window, file, getData: () => data_optimized });
  });

  let string_original;
  let size_original;

  let handle;
  let data_optimized;
  let plugins = defaultPlugins;
  let file;

  const label_size = builder.get_object("label_size");

  const drawing_area = builder.get_object("drawing_area");
  function draw(self, cr, drawing_area_width, drawing_area_height) {
    debug("draw", drawing_area_width, drawing_area_height);

    drawCheckerboard(cr, 0, 0, drawing_area_width, drawing_area_height);

    if (handle) {
      drawHandle(cr, handle, drawing_area_width, drawing_area_height);
    }

    cr.$dispose();
  }
  drawing_area.set_draw_func(draw);
  async function proceed() {
    const config = {
      multipass: true,
      floatPrecision: scale.get_value(),
      plugins,
    };

    debug("proceed", JSON.stringify(config));

    // ({ handle, data_optimized } = process({
    //   string_original,
    //   config,
    // }));

    processOOP({
      string_original,
      config,
      cb(foo) {
        handle = foo.handle;
        data_optimized = foo.data_optimized;
        updateLabel({
          label: label_size,
          size_original,
          data_optimized,
        });

        // Draw
        drawing_area.queue_draw();
      },
    });
  }

  const scale = builder.get_object("scale");
  scale.connect("value-changed", () => {
    proceed();
  });

  const button_demo = builder.get_object("button_demo");
  button_demo.connect("clicked", () => {
    openFile(Gio.File.new_for_path(relativePath("./car-lite.svg")));
  });

  function openFile(_file) {
    window.maximize();

    builder.get_object("stack").set_visible_child_name("view_edit");
    window.add_action(action_save);

    file = _file;
    const [, data_original] = file.load_contents(null);
    string_original = ByteArray.toString(data_original);
    size_original = data_original.length;

    proceed();
  }

  Plugins({
    builder,
    defaultValue: defaultPlugins,
    onChange(value) {
      plugins = value;
      proceed();
    },
  });

  window.present();
  // FIXME: ideally we would draw original first
  // svgo can take a while to compute on very large SVGs

  return { window, openFile };
}

function updateLabel({ label, size_original, data_optimized }) {
  const size_optimized = data_optimized.length;
  const size_difference = size_original - size_optimized;
  const size_percent = Math.round((size_difference / size_original) * 100);
  label.set_markup(
    `${GLib.format_size(size_original)} → ${GLib.format_size(
      size_optimized,
    )}\n<span color="#2ec27e">${size_percent}%</span> smaller`,
  );
}
