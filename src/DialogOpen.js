import Gtk from "gi://Gtk";

export default function DialogOpen({ window, onFile }) {
  const dialog = new Gtk.FileChooserNative({
    transient_for: window,
    action: Gtk.FileChooserAction.OPEN,
  });
  dialog.set_modal(true);
  const filter = new Gtk.FileFilter();
  filter.set_name("SVG");
  filter.add_mime_type("image/svg+xml");
  dialog.add_filter(filter);
  dialog.connect("response", (self, response) => {
    if (response === Gtk.ResponseType.ACCEPT) {
      onFile(dialog.get_file());
    }

    dialog.destroy();
  });
  dialog.show();
}
