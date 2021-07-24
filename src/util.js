import GLib from "gi://GLib";
import system from "system";

export function logEnum(obj, value) {
  log(
    Object.entries(obj).find(([k, v]) => {
      return v === value;
    })[0],
  );
}

export function debug(...args) {
  if (!__DEV__) return;
  log(args);
}

export function relativePath(path) {
  const [filename] = GLib.filename_from_uri(import.meta.url);
  const dirname = GLib.path_get_dirname(filename);
  return GLib.canonicalize_filename(path, dirname);
}

export function getSystemInformation({ argv, version }) {
  const v = system.version.toString();
  const gjs_version = `${v[0]}.${+(v[1] + v[2])}.${+(v[3] + v[4])}`;

  return [
    `OS: ${GLib.get_os_info("PRETTY_NAME")}`,
    `Oh My SVG: ${version}`,
    `SVGO: 2.3.1`,
    `GJS: ${gjs_version}`,
    `argv: ${argv.join(" ")}`,
    `programInvocationName: ${system.programInvocationName}`,
    `PWD: ${GLib.get_current_dir()}`,
    `_: ${GLib.getenv("_")}`,
    // `XDG_DATA_DIRS: ${GLib.getenv("XDG_DATA_DIRS")}`,
    // `PATH: ${GLib.getenv("PATH")}`,
    `FLATPAK_ID: ${GLib.getenv("FLATPAK_ID")}`,
    `XDG_SESSION_TYPE: ${GLib.getenv("XDG_SESSION_TYPE")}`,
  ];
}
