// If you make changes to this file you must run `make svgo`

import { optimize } from "svgo";
import { defaultPlugins, extendDefaultPlugins } from "svgo/lib/svgo/config.js";
import plugins from "svgo/plugins/plugins.js";

export { optimize, defaultPlugins, extendDefaultPlugins, plugins };
