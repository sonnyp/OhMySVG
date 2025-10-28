import Rsvg from "gi://Rsvg";

import { optimize } from "./svgo.js";

const ByteArray = imports.byteArray;

const CHECK_SIZE = 32;
export const CANVAS_PADDING = 32;

export function process({ string_original, config }) {
  const result = optimize(string_original, config);

  const { data: string_optimized } = result;
  const data_optimized = ByteArray.fromString(string_optimized);

  const handle = Rsvg.Handle.new_from_data(data_optimized);
  // FIXME: doc says to set dpi but what and why?
  // isn't the default good enough?
  // handle.set_dpi()
  const dimensions = handle.get_dimensions();
  console.debug("librsvg", dimensions.width, dimensions.height);

  return {
    handle,
    dimensions,
    data_optimized,
  };
}

export function drawCheckerboard(cr, x, y, width, height) {
  let i, j;

  cr.rectangle(x, y, width, height);
  cr.setSourceRGB(0.4, 0.4, 0.4);
  cr.fill();

  /* Only works for CHECK_SIZE a power of 2 */
  j = x & -CHECK_SIZE;

  for (; j < height; j += CHECK_SIZE) {
    i = y & -CHECK_SIZE;
    for (; i < width; i += CHECK_SIZE)
      if ((i / CHECK_SIZE + j / CHECK_SIZE) % 2 === 0)
        cr.rectangle(i, j, CHECK_SIZE, CHECK_SIZE);
  }

  cr.setSourceRGB(0.7, 0.7, 0.7);
  cr.fill();
}

export function drawHandle(
  cr,
  handle,
  drawing_area_width,
  drawing_area_height,
) {
  const width = drawing_area_width - CANVAS_PADDING;
  const height = drawing_area_height - CANVAS_PADDING;

  const x = (drawing_area_width - width) / 2;
  const y = (drawing_area_height - height) / 2;

  handle.render_document(cr, new Rsvg.Rectangle({ x, y, width, height }));
}
