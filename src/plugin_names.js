export default [
  // Fairly new; hasn't made it into SVGOMG yet
  {
    id: "mergeStyles",
    name: "merge styles",
  },
  // not enabled in svgomg - disabled by default
  {
    id: "removeOffCanvasPaths",
    name: "Remove elements outside the viewbox",
  },
  // The following names were provided by SVGOMG
  // https://github.com/jakearchibald/svgomg/blob/82c92f6ccc9f124549d94c182c9d5ad5e8431830/src/config.json
  {
    id: "removeDoctype",
    name: "Remove doctype",
  },
  {
    id: "removeXMLProcInst",
    name: "Remove XML instructions",
  },
  {
    id: "removeComments",
    name: "Remove comments",
  },
  {
    id: "removeMetadata",
    name: "Remove <metadata>",
  },
  {
    id: "removeXMLNS",
    name: "Remove xmlns",
  },
  {
    id: "removeEditorsNSData",
    name: "Remove editor data",
  },
  {
    id: "cleanupAttrs",
    name: "Cleanup attribute whitespace",
  },
  {
    id: "inlineStyles",
    name: "Inline styles",
  },
  {
    id: "minifyStyles",
    name: "Minify styles",
  },
  // Disabled by default since SVGO 2.1.0
  // https://github.com/svg/svgo/releases/tag/v2.1.0
  // https://github.com/svg/svgo/pull/1365
  // SVGOMG use svgo ^1.3.0
  // also - produces bigger outputs with Ghostscript_Tiger.svg
  {
    id: "convertStyleToAttrs",
    name: "Style to attributes",
  },
  {
    id: "cleanupIDs",
    name: "Clean IDs",
  },
  {
    id: "removeRasterImages",
    name: "Remove raster images",
  },
  {
    id: "removeUselessDefs",
    name: "Remove unused defs",
  },
  {
    id: "cleanupNumericValues",
    name: "Round/rewrite numbers",
  },
  {
    id: "cleanupListOfValues",
    name: "Round/rewrite number lists",
  },
  {
    id: "convertColors",
    name: "Minify colours",
  },
  {
    id: "removeUnknownsAndDefaults",
    name: "Remove unknowns & defaults",
  },
  {
    id: "removeNonInheritableGroupAttrs",
    name: "Remove unneeded group attrs",
  },
  {
    id: "removeUselessStrokeAndFill",
    name: "Remove useless stroke & fill",
  },
  {
    id: "removeViewBox",
    name: "Remove viewBox",
  },
  {
    id: "cleanupEnableBackground",
    name: "Remove/tidy enable-background",
  },
  {
    id: "removeHiddenElems",
    name: "Remove hidden elements",
  },
  {
    id: "removeEmptyText",
    name: "Remove empty text",
  },
  {
    id: "convertShapeToPath",
    name: "Shapes to (smaller) paths",
  },
  {
    id: "moveElemsAttrsToGroup",
    name: "Move attrs to parent group",
  },
  {
    id: "moveGroupAttrsToElems",
    name: "Move group attrs to elements",
  },
  {
    id: "collapseGroups",
    name: "Collapse useless groups",
  },
  {
    id: "convertPathData",
    name: "Round/rewrite paths",
  },
  {
    id: "convertEllipseToCircle",
    name: "Convert non-eccentric <ellipse> to <circle>",
  },
  {
    id: "convertTransform",
    name: "Round/rewrite transforms",
  },
  {
    id: "removeEmptyAttrs",
    name: "Remove empty attrs",
  },
  {
    id: "removeEmptyContainers",
    name: "Remove empty containers",
  },
  {
    id: "mergePaths",
    name: "Merge paths",
  },
  {
    id: "removeUnusedNS",
    name: "Remove unused namespaces",
  },
  {
    id: "reusePaths",
    name: "Replace duplicate elements with links",
  },
  // produce smaller gzipped - why disabled by default?
  // https://github.com/svg/svgo/pull/1506
  {
    id: "sortAttrs",
    // name: "Sort attrs",
    name: "Sort attributes",
  },
  {
    id: "sortDefsChildren",
    name: "Sort children of <defs>",
  },
  {
    id: "removeTitle",
    name: "Remove <title>",
  },
  {
    id: "removeDesc",
    name: "Remove <desc>",
  },
  {
    id: "removeDimensions",
    name: "Prefer viewBox to width/height",
  },
  {
    id: "removeStyleElement",
    name: "Remove style elements",
  },
  {
    id: "removeScriptElement",
    name: "Remove script elements",
  },
];
