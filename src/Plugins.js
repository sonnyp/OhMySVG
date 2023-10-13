import Adw from "gi://Adw";

import { plugins as svgo_plugins } from "./svgo.js";
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

const plugins = Object.entries(svgo_plugins)
  .filter(([key]) => !exclude.includes(key))
  .map(([key, value]) => {
    const name = plugin_names.find((plugin) => plugin.id === key)?.name || key;
    return {
      ...value,
      id: key,
      name,
    };
  });

export default function Plugins({ builder, defaultValue, onChange }) {
  let value = defaultValue;

  function onToggle(self) {
    const { plugin_id, active } = self;

    const set = new Set(value);
    if (active) {
      set.add(plugin_id);
    } else {
      set.delete(plugin_id);
    }
    value = Array.from(set);
    onChange(value);
  }

  const plugins_box = builder.get_object("plugins");
  plugins.forEach((plugin) => {
    const { id, active, name } = plugin;
    const row = new Adw.SwitchRow({
      title: name,
      active,
      use_markup: false,
    });
    row.plugin_id = id;

    row.connect("notify::active", onToggle);
    plugins_box.append(row);
  });
}
