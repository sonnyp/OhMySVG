import Gtk from "gi://Gtk";
import Gio from "gi://Gio";

export default function DialogSave({ window, file, getData }) {
  const dialog = new Gtk.FileChooserNative({
    transient_for: window,
    action: Gtk.FileChooserAction.SAVE,
    modal: true,
  });
  dialog.set_current_name(file.get_basename());
  dialog.connect("response", (self, response) => {
    if (response !== Gtk.ResponseType.ACCEPT) {
      return;
    }

    dialog.get_file().replace_contents(
      getData(), // contents
      null, // etag
      true, // make_backup
      Gio.FileCreateFlags.NONE, // flags
      null, // new_etag
    );
    // FIXME: Should we do something after saving ?
    // close the application or open the file
    // window.close();

    dialog.destroy();
  });
  dialog.show();
}
