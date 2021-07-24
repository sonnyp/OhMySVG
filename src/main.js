import "./setup.js";

import Gio from "gi://Gio";
import GLib from "gi://GLib";

import Application from "./Application.js";
import { getSystemInformation } from "./util.js";

GLib.set_prgname("re.sonny.OhMySVG");
GLib.set_application_name("Oh My SVG");

export default function main(argv, { version }) {
  const system_information = getSystemInformation({ argv, version });
  if (__DEV__) {
    system_information.forEach((line) => log(line));
  }

  const application = Application({ version, system_information });

  if (__DEV__) {
    const restart = new Gio.SimpleAction({
      name: "restart",
      parameter_type: null,
    });
    restart.connect("activate", () => {
      application.quit();
      GLib.spawn_async(null, argv, null, GLib.SpawnFlags.DEFAULT, null);
    });
    application.add_action(restart);
    application.set_accels_for_action("app.restart", ["<Ctrl><Shift>Q"]);
  }

  application.run(argv);
}
