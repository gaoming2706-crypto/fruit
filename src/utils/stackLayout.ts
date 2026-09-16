import { Fruit } from '../types/fruit';

export interface BoxPlacedCube {
  id: string;
  fruit: Fruit;
  size: number; // e.g. 38 to 56 px
  x: number; // px from container left
  y: number; // px from container top
  rotation: number; // e.g. -12 to 12 deg
  depth: number; // 0 = base layer, 1 = mid layer, 2 = top mound
  seed: number;
}

/**
 * Generates an organic, stacked pile of cut fruit cubes that tightly fills the square silver box container.
 * Total container interior area is approx 280x280px to 320x320px.
 * The cubes vary in size (38px ~ 54px), with organic offsets, rotation angles, and multi-depth stacking (base, mid, top).
 * Each cube is strictly mapped to the corresponding selected fruits based on box layout (Single, Double, Triple, Quad).
 */
export function generateStackedCubes(fruits: Fruit[], containerSize: number = 300): BoxPlacedCube[] {
  if (fruits.length === 0) return [];

  const cubes: BoxPlacedCube[] = [];
  const fruitCount = fruits.length;

  // Margin inside the metal box cavity
  const pad = 12;
  const usableSize = containerSize - pad * 2;

  // Layer 0: Dense Base Floor Layer (approx 5x5 grid with natural jitter to fill the bottom)
  const baseGridSize = 5;
  const step = usableSize / baseGridSize;

  for (let r = 0; r < baseGridSize; r++) {
    for (let c = 0; c < baseGridSize; c++) {
      const cellCenterX = pad + c * step + step / 2;
      const cellCenterY = pad + r * step + step / 2;

      // Determine which fruit this coordinate belongs to
      const fruitIndex = getFruitIndexByPosition(cellCenterX / containerSize, cellCenterY / containerSize, fruitCount);
      const fruit = fruits[fruitIndex] || fruits[0];

      // Varied size: 44px to 52px
      const seed = (r * 7 + c * 13 + 101);
      const jitterX = ((seed % 11) - 5) * 1.5;
      const jitterY = (((seed * 3) % 11) - 5) * 1.5;
      const size = 44 + (seed % 9); // 44 ~ 52px
      const rot = ((seed % 17) - 8); // -8 ~ +8 deg

      cubes.push({
        id: `cube-base-${r}-${c}-${fruit.id}`,
        fruit,
        size,
        x: cellCenterX + jitterX - size / 2,
        y: cellCenterY + jitterY - size / 2,
        rotation: rot,
        depth: 0,
        seed,
      });
    }
  }

  // Layer 1: Staggered Mid Layer (fills gaps, sits in interstices between base cubes, varied sizes 42px~50px)
  const midRows = 4;
  const midCols = 4;
  const midStep = usableSize / midCols;

  for (let r = 0; r < midRows; r++) {
    for (let c = 0; c < midCols; c++) {
      const cellCenterX = pad + (c + 0.5) * midStep;
      const cellCenterY = pad + (r + 0.5) * midStep;

      const fruitIndex = getFruitIndexByPosition(cellCenterX / containerSize, cellCenterY / containerSize, fruitCount);
      const fruit = fruits[fruitIndex] || fruits[0];

      const seed = (r * 19 + c * 23 + 307);
      const jitterX = ((seed % 13) - 6) * 1.8;
      const jitterY = (((seed * 5) % 13) - 6) * 1.8;
      const size = 42 + (seed % 11); // 42 ~ 52px
      const rot = ((seed % 23) - 11); // -11 ~ +11 deg

      cubes.push({
        id: `cube-mid-${r}-${c}-${fruit.id}`,
        fruit,
        size,
        x: cellCenterX + jitterX - size / 2,
        y: cellCenterY + jitterY - size / 2,
        rotation: rot,
        depth: 1,
        seed,
      });
    }
  }

  // Layer 2: Top Mound Layer (heaped in the center, giving luscious stacked 3D volume, size 38px~48px)
  const topPositions = [
    { nx: 0.38, ny: 0.38 },
    { nx: 0.62, ny: 0.38 },
    { nx: 0.38, ny: 0.62 },
    { nx: 0.62, ny: 0.62 },
    { nx: 0.50, ny: 0.50 },
    { nx: 0.50, ny: 0.32 },
    { nx: 0.50, ny: 0.68 },
    { nx: 0.32, ny: 0.50 },
    { nx: 0.68, ny: 0.50 },
  ];

  topPositions.forEach((pos, idx) => {
    const cx = pos.nx * containerSize;
    const cy = pos.ny * containerSize;

    const fruitIndex = getFruitIndexByPosition(pos.nx, pos.ny, fruitCount);
    const fruit = fruits[fruitIndex] || fruits[0];

    const seed = (idx * 31 + 719);
    const jitterX = ((seed % 9) - 4) * 1.2;
    const jitterY = (((seed * 7) % 9) - 4) * 1.2;
    const size = 40 + (seed % 9); // 40 ~ 48px
    const rot = ((seed % 25) - 12); // -12 ~ +12 deg

    cubes.push({
      id: `cube-top-${idx}-${fruit.id}`,
      fruit,
      size,
      x: cx + jitterX - size / 2,
      y: cy + jitterY - size / 2,
      rotation: rot,
      depth: 2,
      seed,
    });
  });

  return cubes;
}

/**
 * Maps relative coordinate (0..1, 0..1) to fruit index:
 * - 1 fruit: index 0
 * - 2 fruits: left half = 0, right half = 1
 * - 3 fruits: 3 equal vertical sections: 0..0.33 => 0, 0.33..0.66 => 1, 0.66..1.0 => 2
 * - 4 fruits: 4 quadrants: Top-Left (0), Top-Right (1), Bottom-Left (2), Bottom-Right (3)
 */
export function getFruitIndexByPosition(normalizedX: number, normalizedY: number, fruitCount: number): number {
  if (fruitCount <= 1) return 0;

  if (fruitCount === 2) {
    return normalizedX < 0.5 ? 0 : 1;
  }

  if (fruitCount === 3) {
    if (normalizedX < 0.34) return 0;
    if (normalizedX < 0.66) return 1;
    return 2;
  }

  // fruitCount === 4 (Quad)
  const isTop = normalizedY < 0.5;
  const isLeft = normalizedX < 0.5;
  if (isTop && isLeft) return 0;
  if (isTop && !isLeft) return 1;
  if (!isTop && isLeft) return 2;
  return 3;
}
