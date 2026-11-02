import Gtk from "gi://Gtk";
import GLib from "gi://GLib";
import Gio from "gi://Gio";
import Gdk from "gi://Gdk";
import Adw from "gi://Adw";
import GtkSource from "gi://GtkSource";

import plugins_data from "./plugin_data.js";
import Plugins from "./Plugins.js";
import { drawCheckerboard, drawHandle, process } from "./ohmysvg.js";
import DialogSave from "./DialogSave.js";
import DialogOpen from "./DialogOpen.js";

import { build } from "troll";
import Interface from "./window.blp" with { type: "uri" };
import car_lite_image_resource from "./car-lite.svg" with { type: "uri" };

const ByteArray = imports.byteArray;
const utf8decoder = new TextDecoder();

export default function Window({ application }) {
  const {
    window,
    label_size,
    drawing_area,
    scale,
    button_demo,
    stack,
    plugins_box,
    button_save,
    source_buffer,
  } = build(Interface);

  window.set_application(application);
  window.set_default_size(410, 550);

  const language_manager = GtkSource.LanguageManager.get_default();
  source_buffer.set_language(language_manager.get_language("xml"));
  const scheme_manager = GtkSource.StyleSchemeManager.get_default();
  const adw_sm = Adw.StyleManager.get_default();
  const update_editor_scheme = () => 
    source_buffer.set_style_scheme(scheme_manager.get_scheme(
      adw_sm.get_dark() ? "Adwaita-dark" : "Adwaita"));
  adw_sm.connect("notify::dark", update_editor_scheme);
  update_editor_scheme();

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
    DialogSave({
      window,
      file,
      getData: () => data_optimized,
    });
  });

  let string_original;
  let size_original;

  let handle;
  let data_optimized;
  let plugins = plugins_data
    .filter((plugin) => plugin.enabledByDefault)
    .map((plugin) => plugin.id);
  let file;

  const action_copy = new Gio.SimpleAction({
    name: "copy",
    parameter_type: null,
  });

  action_copy.connect("activate", () => {
    Gdk.Display.get_default().get_clipboard().set(utf8decoder.decode(data_optimized))
  });

  function draw(self, cr, drawing_area_width, drawing_area_height) {
    console.debug("draw", drawing_area_width, drawing_area_height);

    drawCheckerboard(cr, 0, 0, drawing_area_width, drawing_area_height);

    if (handle) {
      drawHandle(cr, handle, drawing_area_width, drawing_area_height);
    }

    cr.$dispose();
  }
  drawing_area.set_draw_func(draw);
  function proceed() {
    const config = {
      multipass: true,
      floatPrecision: scale.get_value(),
      plugins,
    };

    console.debug("proceed", JSON.stringify(config));

    ({ handle, data_optimized } = process({
      string_original,
      config,
    }));

    updateLabel({
      label: label_size,
      size_original,
      data_optimized,
    });

    source_buffer.set_text(utf8decoder.decode(data_optimized), -1);

    // Draw
    drawing_area.queue_draw();
  }

  scale.connect("value-changed", () => {
    proceed();
  });

  button_demo.connect("clicked", () => {
    openFile(Gio.File.new_for_uri(car_lite_image_resource));
  });

  function reloadFile() {
    const [, data_original] = file.load_contents(null);
    string_original = ByteArray.toString(data_original);
    size_original = data_original.length;
    proceed();
  }

  const action_reload = new Gio.SimpleAction({
    name: "reload",
    parameter_type: null,
  });

  action_reload.connect("activate", reloadFile);

  function openFile(_file) {
    button_save.visible = true;
    stack.set_visible_child_name("view_edit");
    window.add_action(action_save);
    window.add_action(action_copy);
    window.add_action(action_reload);

    file = _file;
    reloadFile();
  }

  Plugins({
    plugins_box,
    defaultValue: plugins,
    onChange(value) {
      plugins = value;
      proceed();
    },
  });

  window.present();
  // FIXME: ideally we would draw original first
  // svgo can take a while to compute on very large SVGs

  setupDragAndDrop(stack, openFile);

  return { window, openFile };
}

function setupDragAndDrop(drop_area, openFile) {
  const dropTarget = new Gtk.DropTarget({
    actions: Gdk.DragAction.COPY,
    formats: Gdk.ContentFormats.new_for_gtype(Gio.File.$gtype),
  });

  dropTarget.connect("drop", (target, value, x, y) => {
    if (value instanceof Gio.File) {
      try {
        const fileInfo = value.query_info("standard::content-type", 0, null);
        const contentType = fileInfo.get_content_type();

        if (contentType === "image/svg+xml") {
          openFile(value);
          return true;
        }
      } catch (e) {
        console.debug("Error checking file type:", e);
      }
    }
    return false;
  });

  drop_area.add_controller(dropTarget);
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
