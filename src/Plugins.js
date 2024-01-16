import Adw from "gi://Adw";

import plugin_data from "./plugin_data.js";

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
  plugin_data.forEach((plugin) => {
    const { id, name, enabledByDefault } = plugin;
    const row = new Adw.SwitchRow({
      title: name,
      active: enabledByDefault,
      use_markup: false,
    });
    row.plugin_id = id;

    row.connect("notify::active", onToggle);
    plugins_box.append(row);
  });
}
