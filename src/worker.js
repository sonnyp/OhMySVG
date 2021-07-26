import { read, send } from "./ipc.js";
import { getpid } from "./util.js";
import { optimize } from "./svgo.js";

log(`worker pid ${getpid()}`);

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;

const loop = new GLib.MainLoop(null, true);

const stdin = new Gio.DataInputStream({
  base_stream: new Gio.UnixInputStream({ fd: 0 }),
});
const source = stdin.base_stream.create_source(null);
source.set_callback(() => {
  const message = read(stdin);
  const result = optimize(...message);
  send(stdout, result);
  return GLib.SOURCE_CONTINUE;
});
source.attach(null);

const stdout = new Gio.DataOutputStream({
  base_stream: new Gio.UnixOutputStream({ fd: 1 }),
});

loop.run();
