import Adw from "gi://Adw";
import Gio from "gi://Gio";

import Window from "./Window.js";
import About from "./About.js";

export default function Application() {
  const application = new Adw.Application({
    application_id: "re.sonny.OhMySVG",
    flags: Gio.ApplicationFlags.HANDLES_OPEN,
  });

  application.connect("open", (self, files) => {
    files.forEach((file) => {
      const { openFile } = Window({ application });
      openFile(file);
    });
  });

  application.connect("activate", () => {
    Window({
      application,
    });
  });

  const action_quit = new Gio.SimpleAction({
    name: "quit",
    parameter_type: null,
  });
  action_quit.connect("activate", () => {
    application.quit();
  });
  application.add_action(action_quit);

  const action_about = new Gio.SimpleAction({
    name: "about",
    parameter_type: null,
  });
  action_about.connect("activate", () => {
    About({ application });
  });
  application.add_action(action_about);

  const action_new = new Gio.SimpleAction({
    name: "new",
    parameter_type: null,
  });
  action_new.connect("activate", () => {
    Window({
      application,
    });
  });
  application.add_action(action_new);

  application.set_accels_for_action("app.quit", ["<Ctrl>Q"]);
  application.set_accels_for_action("win.open", ["<Ctrl>O"]);
  application.set_accels_for_action("win.save", ["<Ctrl>S"]);
  application.set_accels_for_action("app.new", ["<Ctrl>N"]);

  return application;
}
