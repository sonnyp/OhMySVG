import { read, send } from "./ipc.js";
import { getpid } from "./util.js";

log(`tryan pid ${getpid()}`);

const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;

const loop = GLib.MainLoop.new(null, false);

// Ideally we would use the same GJS path for the worker as for the main process
// but I couldn't find a way. There is a WIP for system.execPath though
// https://gitlab.gnome.org/GNOME/gjs/-/issues/373
const proc = Gio.Subprocess.new(
  ["gjs", "-m", "./src/worker.js"],
  Gio.SubprocessFlags.STDIN_PIPE | Gio.SubprocessFlags.STDOUT_PIPE,
);

const stdin = proc.get_stdin_pipe();
GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
  send(stdin, { hello: "world" });
  return GLib.SOURCE_CONTINUE;
});

const stdout = new Gio.DataInputStream({
  base_stream: proc.get_stdout_pipe(),
});
const source = stdout.base_stream.create_source(null);
source.set_callback(() => {
  const message = read(stdout);
  log(["tyran received", JSON.stringify(message)]);
  return GLib.SOURCE_CONTINUE;
});
source.attach(null);

// proc
// log("foo");
// proc.communicate_utf8_async("foo", null, (proc, res) => {
//   log("hello");
//   const [, stdout, stderr] = proc.communicate_utf8_finish(res);

//   log("bla");

//   log(stdout);
//   log(stderr);

//   if (proc.get_successful()) {
//     log(stdout);
//   } else {
//     throw new Error(stderr);
//   }
// });

// proc.wait(null);

loop.run();
