import Gtk from "gi://Gtk";
import Adw from "gi://Adw";

import { gettext as _ } from "gettext";

export default function About({ application }) {
  const dialog = new Adw.AboutDialog({
    application_name: "Oh My SVG",
    developer_name: "Sonny Piers",
    copyright: "© 2021 Sonny Piers",
    license_type: Gtk.License.GPL_3_0_ONLY,
    version: pkg.version,
    website: "https://ohmysvg.sonny.re",
    application_icon: "re.sonny.OhMySVG",
    issue_url: "https://ohmysvg.sonny.re/feedback",
    // TRANSLATORS: eg. 'Translator Name <your.email@domain.com>' or 'Translator Name https://website.example'
    translator_credits: _("translator-credits"),
    developers: ["Sonny Piers https://sonny.re"],
    designers: [
      "Sonny Piers https://sonny.re",
      "Tobias Bernard <tbernard@gnome.org>",
    ],
    artists: ["Sam Hewitt"],
  });
  dialog.add_credit_section("Contributors", [
    // Add yourself as
    // "John Doe",
    // or
    // "John Doe <john@example.com>",
    // or
    // "John Doe https://john.com",
    "Seth Falco <seth@falco.fun>",
  ]);
  dialog.present(application.get_active_window());

  return { dialog };
}
