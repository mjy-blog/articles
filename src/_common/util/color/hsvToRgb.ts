export function hsvToRgb(
  h: number,
  s: number,
  v: number,
): [r: number, g: number, b: number] {
  let r = 0;
  let g = 0;
  let b = 0;

  if (s === 0) {
    r = g = b = v;
  } else {
    let type = Math.floor(h * 6);
    let progress = h * 6 - type;
    let p = v * (1 - s);
    let q = v * (1 - progress * s);
    let t = v * (1 - (1 - progress) * s);

    switch (type % 6) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = v;
        b = p;
        break;
      case 2:
        r = p;
        g = v;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = v;
        break;
      case 4:
        r = t;
        g = p;
        b = v;
        break;
      case 5:
        r = v;
        g = p;
        b = q;
        break;
    }
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
