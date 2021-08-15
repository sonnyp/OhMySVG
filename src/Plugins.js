import Gtk from "gi://Gtk";

import { plugins as svgo_plugins } from "./svgo.js";
import { debug } from "./util.js";
import plugin_names from "./plugin_names.js";

const exclude = [
  // https://github.com/svg/svgo/releases/tag/v2.4.0
  "preset-default",
  // These plugins don't do anything by default
  // and require additional configuration
  "addAttributesToSVGElement",
  "addClassesToSVGElement",
  "prefixIds",
  "removeAttributesBySelector",
  "removeAttrs",
  "removeElementsByAttr",
];

log(Object.keys(svgo_plugins));

const plugins = Object.entries(svgo_plugins)
  .filter(([key]) => !exclude.includes(key))
  .map(([key, value]) => {
    const name = plugin_names.find((plugin) => plugin.id === key)?.name || key;
    return {
      id: key,
      name,
      ...value,
    };
  });

export default function Plugins({ builder, defaultValue, onChange }) {
  const rows = {};

  let value = defaultValue;

  function onToggle(self, state) {
    const [plugin] = Object.entries(rows).find(([, { toggle }]) => {
      return toggle === self;
    });

    const set = new Set(value);
    if (state) {
      set.add(plugin);
    } else {
      set.delete(plugin);
    }
    value = Array.from(set);
    onChange(value);
  }

  const plugins_box = builder.get_object("plugins");
  plugins.forEach((plugin) => {
    const row = Row(plugin);
    rows[plugin.id] = row;
    row.toggle.connect("state-set", onToggle);
    plugins_box.append(row.listBoxRow);
  });

  plugins_box.connect("row-activated", (self, listBoxRow) => {
    rows[listBoxRow.plugin_id].toggle.active =
      !rows[listBoxRow.plugin_id].toggle.active;
    debug(listBoxRow.plugin_id);
  });
}

function Row({ id, active, name }) {
  const listBoxRow = new Gtk.ListBoxRow();
  const box = new Gtk.Box();
  listBoxRow.set_child(box);
  listBoxRow.plugin_id = id;

  const label = new Gtk.Label({ label: name });
  label.xalign = 0;
  label.halign = Gtk.Align.START;
  label.valign = Gtk.Align.CENTER;
  label.hexpand = 1;
  box.append(label);

  const toggle = new Gtk.Switch({
    state: active,
    halign: Gtk.Align.END,
    valign: Gtk.Align.CENTER,
  });
  box.append(toggle);

  return { listBoxRow, toggle };
}
