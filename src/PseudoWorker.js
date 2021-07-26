import { relativePath } from "./util.js";

export default class PseudoWorker {
  constructor(url, options = {}) {
    const path = relativePath(url);
  }
  postMessage() {}
}
