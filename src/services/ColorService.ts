/**
 * Converts hexadecimal color to it's equivalent RGBA value.
 *
 * @param hexColor The hex colors to convert, must start with '#'
 * @param alpha The alpha value to apply to the returned RGBA value
 */
export const convertHexToRGBA = (hexColor: string, alpha: number) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const alphaChannel = alpha > 1 ? alpha / 100 : alpha;

  return `rgba(${r}, ${g}, ${b}, ${alphaChannel})`;
};
