import Gtk from "gi://Gtk";
import Adw from "gi://Adw";

import { gettext as _ } from "gettext";

export default function About({ application, version, system_information }) {
  const dialog = new Adw.AboutWindow({
    transient_for: application.get_active_window(),
    modal: true,
    // system_information: system_information.join("\n"),

    application_name: "Oh My SVG",
    developer_name: "Sonny Piers",
    copyright: "© 2021 Sonny Piers",
    license_type: Gtk.License.GPL_3_0_ONLY,
    version,
    website: "https://github.com/sonnyp/OhMySVG",
    application_icon: "re.sonny.OhMySVG",
    issue_url: "https://github.com/sonnyp/OhMySVG/issues",
    // TRANSLATORS: eg. 'Translator Name <your.email@domain.com>' or 'Translator Name https://website.example'
    translator_credits: _("translator-credits"),
    debug_info: system_information.join("\n"),
    developers: ["Sonny Piers https://sonny.re"],
    designers: [
      "Sonny Piers https://sonny.re",
      "Tobias Bernard <tbernard@gnome.org>",
    ],
    artists: ["Sam Hewitt"],
    hide_on_close: true,
  });
  //   dialog.add_credit_section("Contributors", [
  //     // Add yourself as
  //     // "John Doe",
  //     // or
  //     // "John Doe <john@example.com>",
  //     // or
  //     // "John Doe https://john.com",
  //   ]);
  dialog.present();

  return { dialog };
}
