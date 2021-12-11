// GLib, GObject, and Gio are required by GJS so no version is necessary.
// https://gitlab.gnome.org/GNOME/gjs/-/blob/master/doc/ESModules.md
// import "gi://Gio";
// import "gi://GLib";
import Gtk from "gi://Gtk?version=4.0";
import "gi://GdkPixbuf?version=2.0";
import "gi://Gdk?version=4.0";
import "gi://Rsvg?version=2.0";
import Adw from "gi://Adw?version=1";

Adw.init();
Gtk.init();
