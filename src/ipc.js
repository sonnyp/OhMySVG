const byteArray = imports.byteArray;

export function send(stream, value) {
  const str = JSON.stringify(value);
  const bytes = byteArray.fromString(str);
  stream.write(bytes.length.toString().padStart(4, "0"), null);
  stream.write(bytes, null);
}

export function read(stdout) {
  const length = stdout.read_int32(null);
  const bytes = stdout.read_bytes(length, null);
  const str = byteArray.toString(bytes.toArray());
  //   log(["string", str]);
  const message = JSON.parse(str);
  //   log(["json", JSON.stringify(message)]);
  return message;
}
