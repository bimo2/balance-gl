function contrast(hexColor) {
  let code = hexColor.substr(1);

  if (code.length === 3) {
    code = code.split('').map((hex) => `${hex}${hex}`).join('');
  }

  const red = parseInt(code.substr(0, 2), 16);
  const green = parseInt(code.substr(2, 2), 16);
  const blue = parseInt(code.substr(4, 2), 16);
  const luminosity = ((red * 299) + (green * 587) + (blue * 114)) / 1000;

  return luminosity > 128;
}

export { contrast };