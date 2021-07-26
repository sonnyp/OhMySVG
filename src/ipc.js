// Use WebExtensions Native Messaging protocol
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging#app_side

const byteArray = imports.byteArray;

export function send(stream, value) {
  const str = JSON.stringify(value);
  const bytes = byteArray.fromString(str);
  stream.put_int32(bytes.length, null);
  stream.write(bytes, null);
}

export function read(stdout) {
  const length = stdout.read_int32(null);
  log(length);
  const bytes = stdout.read_bytes(length, null);
  log(bytes.get_size());
  const str = byteArray.toString(bytes.toArray());
  log(str);
  return JSON.parse(str);
}
