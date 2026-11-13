// Deterministic surface vertices, in metres. Every reveal belongs to the same world.
export function buildWorld(density = 1) {
  type Rgb = number[];
  const buckets = Array.from({ length: 5 }, (): number[] => []);
  let seed = 7219;
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    return (seed >>> 0) / 4294967296;
  };
  const palette = {
    stone: [0.69, 0.67, 0.62],
    wood: [0.47, 0.31, 0.21],
    fabric: [0.73, 0.74, 0.7],
    glass: [0.47, 0.65, 0.71],
    metal: [0.38, 0.42, 0.45],
    leaf: [0.31, 0.43, 0.31],
    ground: [0.45, 0.48, 0.43],
    white: [0.82, 0.82, 0.78],
  };
  function point(x: number, y: number, z: number, l: number, c: Rgb, nx = 0, ny = 1, nz = 0) {
    const r = rand(),
      v = 0.84 + rand() * 0.22,
      k = Math.min(4, Math.round(l)),
      j = 0.001 * (1 + k * k);
    buckets[k].push(x + (rand() - 0.5) * j, y + (rand() - 0.5) * j, z + (rand() - 0.5) * j, c[0] * v, c[1] * v, c[2] * v, nx, ny, nz, l + r * 0.17, r);
  }
  function box(x: number, y: number, z: number, w: number, h: number, d: number, l: number, c: Rgb, step = 0.1, round = 0, angle = 0) {
    step /= Math.sqrt(density);
    const co = Math.cos(angle),
      si = Math.sin(angle),
      half = [w / 2, h / 2, d / 2];
    for (let axis = 0; axis < 3; axis++)
      for (const side of [-1, 1]) {
        const a = (axis + 1) % 3,
          b = (axis + 2) % 3,
          na = Math.max(1, Math.ceil((half[a] * 2) / step)),
          nb = Math.max(1, Math.ceil((half[b] * 2) / step));
        for (let i = 0; i <= na; i++)
          for (let j = 0; j <= nb; j++) {
            const p = [0, 0, 0];
            p[axis] = half[axis] * side;
            p[a] = ((i / na) * 2 - 1) * half[a];
            p[b] = ((j / nb) * 2 - 1) * half[b];
            let normal = [0, 0, 0];
            normal[axis] = side;
            if (round) {
              const core = p.map((v, k) => Math.max(-half[k] + round, Math.min(half[k] - round, v))),
                delta = p.map((v, k) => v - core[k]),
                len = Math.hypot(...delta) || 1;
              normal = delta.map((v) => v / len);
              for (let k = 0; k < 3; k++) p[k] = core[k] + normal[k] * round;
            }
            point(
              x + p[0] * co + p[2] * si,
              y + p[1],
              z - p[0] * si + p[2] * co,
              l,
              c,
              normal[0] * co + normal[2] * si,
              normal[1],
              -normal[0] * si + normal[2] * co,
            );
          }
      }
  }
  function tube(x: number, y: number, z: number, r: number, h: number, l: number, c: Rgb, step = 0.08) {
    const n = Math.max(10, Math.ceil((2 * Math.PI * r) / step)),
      rows = Math.max(2, Math.ceil(h / step));
    for (let j = 0; j <= rows; j++)
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        point(x + Math.cos(a) * r, y + (j / rows) * h, z + Math.sin(a) * r, l, c, Math.cos(a), 0, Math.sin(a));
      }
  }
  function foliage(x: number, y: number, z: number, r: number, l: number) {
    const count = Math.round(r * r * 90 * density);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2,
        v = rand() * 2 - 1,
        s = Math.sqrt(1 - v * v),
        radius = r * (0.58 + rand() * 0.42);
      point(x + Math.cos(a) * s * radius, y + v * radius * 0.85, z + Math.sin(a) * s * radius, l, palette.leaf, Math.cos(a) * s, v, Math.sin(a) * s);
    }
  }
  // 0. A fluted ceramic vessel, sitting at the centre of the coffee table.
  const profile = [
    [0, 0.075],
    [0.025, 0.09],
    [0.08, 0.118],
    [0.18, 0.125],
    [0.27, 0.09],
    [0.31, 0.055],
    [0.37, 0.052],
    [0.385, 0.062],
  ];
  for (let row = 0; row < 100; row++) {
    const yy = (row / 99) * 0.385;
    let k = 0;
    while (k < profile.length - 2 && yy > profile[k + 1][0]) k++;
    const t = (yy - profile[k][0]) / (profile[k + 1][0] - profile[k][0]);
    const radius = profile[k][1] * (1 - t) + profile[k + 1][1] * t;
    for (let i = 0; i < 130; i++) {
      const a = (i / 130) * Math.PI * 2,
        rr = radius + 0.0019 * Math.cos(a * 28);
      point(Math.cos(a) * rr, 0.79 + yy, Math.sin(a) * rr, 0, palette.stone, Math.cos(a), 0.05, Math.sin(a));
    }
  }
  // 1. Table and companion seating. The vessel never changes position.
  box(0, 0.745, 0, 1.9, 0.09, 1.05, 0.72, palette.stone, 0.026, 0.035);
  for (const x of [-0.68, 0.68]) box(x, 0.36, 0, 0.13, 0.72, 0.67, 1, palette.wood, 0.028, 0.025);
  box(2, 0.28, -0.55, 1, 0.16, 0.94, 2, palette.wood, 0.045, 0.035);
  box(2, 0.47, -0.55, 0.94, 0.24, 0.9, 2, palette.fabric, 0.032, 0.1);
  box(2, 0.83, -0.94, 0.98, 0.75, 0.18, 2, palette.fabric, 0.035, 0.08, -0.08);
  for (const xx of [1.62, 2.38]) for (const zz of [-0.85, -0.22]) box(xx, 0.13, zz, 0.06, 0.26, 0.06, 2, palette.wood, 0.04, 0.012);
  // 2. A furnished apartment: sofa, rug, lamps, shelving, window mullions and plants.
  box(-0.8, -0.025, -0.4, 8.8, 0.05, 7.2, 2, palette.stone, 0.1);
  box(-0.5, 0.012, -0.2, 3.8, 0.018, 2.9, 2, [0.53, 0.51, 0.46], 0.065);
  box(-0.65, 0.26, -2.15, 2.8, 0.22, 0.95, 2, palette.wood, 0.06, 0.08);
  for (let i = 0; i < 3; i++) {
    box(-1.55 + i * 0.9, 0.47, -2.1, 0.86, 0.23, 0.88, 2, palette.fabric, 0.043, 0.1);
    box(-1.55 + i * 0.9, 0.84, -2.49, 0.88, 0.67, 0.2, 2, palette.fabric, 0.045, 0.08);
  }
  for (const x of [-2.12, 0.82]) box(x, 0.59, -2.15, 0.23, 0.56, 0.98, 2, palette.fabric, 0.045, 0.08);
  box(-4.3, 1.65, -0.4, 0.16, 3.3, 7.2, 2, palette.white, 0.13);
  box(-0.8, 1.65, -4, 8.8, 3.3, 0.12, 2, palette.white, 0.12);
  for (let i = 0; i < 6; i++) {
    box(-4.15, 0.4 + i * 0.45, -0.7, 0.42, 0.055, 2.4, 2, palette.wood, 0.055);
    for (let j = 0; j < 8; j++)
      box(-4.13, 0.56 + i * 0.45, -1.65 + j * 0.26, 0.25, 0.29, 0.055, 2, [0.35 + j * 0.035, 0.37 + j * 0.025, 0.39 + j * 0.02], 0.07);
  }
  for (const x of [-3.3, -1.5, 0.3, 2.1, 3.3]) {
    box(x, 1.65, 3.2, 0.055, 3.3, 0.055, 2, palette.metal, 0.07);
    box(x + 0.7, 1.5, 3.2, 1.35, 2.8, 0.015, 2.1, palette.glass, 0.23);
  }
  box(0, 3.25, 3.2, 7, 0.055, 0.07, 2, palette.metal, 0.07);
  tube(1.4, 0.04, -2.6, 0.12, 0.035, 2, palette.metal);
  tube(1.4, 0.07, -2.6, 0.025, 1.55, 2, palette.metal, 0.04);
  tube(1.4, 1.55, -2.6, 0.24, 0.3, 2, palette.fabric, 0.045);
  for (const [x, z] of [
    [-3.3, 2.2],
    [2.8, -3.2],
  ]) {
    tube(x, 0.02, z, 0.24, 0.42, 2, palette.stone, 0.06);
    tube(x, 0.4, z, 0.025, 0.9, 2, palette.wood, 0.04);
    foliage(x, 1.25, z, 0.58, 2);
  }
  // 3. The apartment belongs to a residential building, with real storeys and facade details.
  function building(x: number, z: number, w: number, d: number, floors: number, l: number, detail = 1) {
    const height = floors * 3.15,
      c = palette.white;
    box(x, height / 2, z, w, height, d, l, c, detail ? 0.67 : 1.35);
    for (let floor = 0; floor < floors; floor++) {
      const yy = floor * 3.15;
      box(x, yy + 0.15, z + d / 2 + 0.18, w + 0.4, 0.18, 0.48, l, palette.stone, detail ? 0.48 : 1.2);
      for (let xx = -w / 2 + 0.85; xx < w / 2 - 0.2; xx += 2.15) {
        box(x + xx, yy + 1.65, z + d / 2 + 0.025, 1.35, 1.65, 0.06, l, palette.glass, detail ? 0.24 : 0.55);
        if (detail) {
          box(x + xx, yy + 2.5, z + d / 2 + 0.08, 1.4, 0.06, 0.08, l, palette.metal, 0.25);
          box(x + xx - 0.7, yy + 1.65, z + d / 2 + 0.08, 0.06, 1.75, 0.08, l, palette.metal, 0.25);
        }
        box(x + xx, yy + 1.65, z - d / 2 - 0.025, 1.35, 1.65, 0.06, l, palette.glass, detail ? 0.28 : 0.65);
      }
      for (let zz = -d / 2 + 1; zz < d / 2 - 0.2; zz += 2.2) box(x + w / 2 + 0.025, yy + 1.65, z + zz, 0.06, 1.65, 1.4, l, palette.glass, detail ? 0.3 : 0.65);
    }
    box(x, height + 0.12, z, w + 0.5, 0.25, d + 0.5, l, palette.stone, detail ? 0.55 : 1.1);
    for (let i = 0; i < 3; i++) box(x - w * 0.24 + i * w * 0.25, height + 0.6, z, 1.25, 0.8, 1.4, l, palette.metal, 0.45);
  }
  building(-0.5, -0.5, 10.2, 8.4, 7, 3, 1);
  // 4. A neighbourhood grows around that same building, with roads and shared amenities.
  const blocks = [
    [-38, -38, 8],
    [-38, 0, 6],
    [-38, 38, 9],
    [0, -38, 9],
    [0, 38, 6],
    [38, -38, 7],
    [38, 0, 10],
    [38, 38, 8],
    [-76, -38, 6],
    [-76, 0, 8],
    [-76, 38, 7],
    [76, -38, 8],
    [76, 0, 6],
    [76, 38, 9],
    [-38, -76, 7],
    [0, -76, 9],
    [38, -76, 7],
  ];
  blocks.forEach(([x, z, f]) => building(x, z, 13 + (Math.abs(x) % 3), 11, f, 4, 0));
  box(0, -0.18, -16, 210, 0.1, 175, 4, palette.ground, 2.5);
  for (const x of [-57, -19, 19, 57]) {
    box(x, -0.09, -16, 8, 0.04, 175, 4, [0.36, 0.39, 0.42], 1.5);
    for (let z = -96; z < 70; z += 8) box(x, -0.06, z, 0.12, 0.01, 3, 4, palette.white, 0.6);
  }
  for (const z of [-57, -19, 19, 57]) box(0, -0.085, z, 210, 0.04, 7, 4, [0.37, 0.4, 0.43], 1.6);
  box(48, 0.03, 72, 28, 0.12, 11, 4, palette.stone, 0.7);
  box(48, 0.11, 72, 25, 0.08, 8.5, 4, [0.3, 0.57, 0.66], 0.65);
  for (let x = -90; x <= 90; x += 12)
    for (const z of [-91, 76]) {
      tube(x, 0, z, 0.22, 2.2, 4, palette.wood, 0.4);
      foliage(x, 4, z, 2.6, 4);
    }
  for (let i = 0; i < 20; i++) {
    const x = -85 + (i % 10) * 18,
      z = i < 10 ? -17 : 20;
    tube(x, 0, z, 0.18, 1.8, 4, palette.wood, 0.4);
    foliage(x, 3.2, z, 2.0, 4);
  }
  for (let i = 0; i < 18; i++) {
    const x = i % 2 ? -18 : 18,
      z = -83 + i * 8.7;
    box(x, 0.65, z, 1.85, 1.3, 4.1, 4, [0.49, 0.52, 0.54], 0.65, 0.24);
    box(x, 1.35, z - 0.15, 1.65, 0.55, 2.2, 4, palette.glass, 0.6, 0.17);
  }
  const budget = [11000, 15000, 38000, 24000, 85000].map((n) => Math.round(n * density));
  const selected = buckets.map((b, k) => {
    const count = b.length / 11,
      limit = Math.min(count, budget[k]),
      out: number[] = [];
    for (let j = 0; j < limit; j++) {
      const at = Math.floor((j * count) / limit) * 11;
      for (let q = 0; q < 11; q++) out.push(b[at + q]);
    }
    return out;
  });
  const count = selected.reduce((n, b) => n + b.length / 11, 0),
    positions = new Float32Array(count * 3),
    colors = new Float32Array(count * 3),
    normals = new Float32Array(count * 3),
    levels = new Float32Array(count),
    seeds = new Float32Array(count);
  let cursor = 0;
  selected.forEach((b) => {
    for (let j = 0; j < b.length; j += 11) {
      positions.set(b.slice(j, j + 3), cursor * 3);
      colors.set(b.slice(j + 3, j + 6), cursor * 3);
      normals.set(b.slice(j + 6, j + 9), cursor * 3);
      levels[cursor] = b[j + 9];
      seeds[cursor] = b[j + 10];
      cursor++;
    }
  });
  return { positions, colors, normals, levels, seeds, count, counts: selected.map((b) => b.length / 11) };
}
