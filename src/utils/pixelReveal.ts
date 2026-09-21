// Mathematical pixel reveal clip-path and threshold generator
// Extracted and replicated from curtisdesignr.me engine

export const REVEAL_COLS = 16;

/**
 * Deterministic pseudorandom noise hash combined with directional bias
 */
export function cellThreshold(
  col: number,
  row: number,
  cols: number = REVEAL_COLS,
  rows: number = 12,
  bias: number = 0.5
): number {
  const raw = 43758.5453 * Math.sin(12.9898 * col + 78.233 * row);
  const hash = raw - Math.floor(raw);
  
  // Vertical gradient (bottom rows dissolve first when moving down to next section)
  const vertGradient = rows > 1 ? (rows - 1 - row) / (rows - 1) : 0;
  // Subtle horizontal gradient
  const horizGradient = cols > 1 ? (cols - 1 - col) / (cols - 1) : 0;
  const combinedGradient = vertGradient * 0.7 + horizGradient * 0.3;

  return hash * (1 - bias) + combinedGradient * bias;
}

/**
 * Calculates number of rows based on aspect ratio
 */
export function revealRows(width: number, height: number, cols: number = REVEAL_COLS): number {
  if (width <= 0) return 1;
  return Math.max(1, Math.ceil((height / width) * cols));
}

/**
 * Generates an SVG path string for CSS clip-path: path('...')
 * This creates the pixelated mosaic dissolve shape.
 *
 * @param progress 0 (empty) to 1 (full solid)
 * @param width Viewport or element width in px
 * @param height Viewport or element height in px
 * @param offsetX Offset X
 * @param offsetY Offset Y
 * @param cols Grid columns (default 16)
 * @param inverted If true, dissolves from full to empty
 */
export function revealClipPath(
  progress: number,
  width: number,
  height: number,
  offsetX: number = 0,
  offsetY: number = 0,
  cols: number = REVEAL_COLS,
  inverted: boolean = false
): string {
  if (width <= 0 || height <= 0) return 'none';
  if (progress <= 0 && !inverted) return "path('M0 0Z')";
  if (progress >= 1 && !inverted) return 'none';
  if (progress <= 0 && inverted) return 'none';
  if (progress >= 1 && inverted) return "path('M0 0Z')";

  const rows = revealRows(width, height, cols);
  const cellW = width / cols;
  const cellH = height / rows;
  let d = '';

  for (let r = 0; r < rows; r++) {
    let startC = -1;
    for (let c = 0; c <= cols; c++) {
      const isVisible = c < cols && progress > 0 && cellThreshold(c, r, cols, rows) <= progress;
      const match = c < cols && (inverted ? !isVisible : isVisible);

      if (match && startC < 0) {
        startC = c;
      }
      if (!match && startC >= 0) {
        const x1 = (startC * cellW - offsetX).toFixed(1);
        const x2 = (c * cellW - offsetX).toFixed(1);
        const y1 = (r * cellH - offsetY).toFixed(1);
        const y2 = ((r + 1) * cellH - offsetY).toFixed(1);
        d += `M${x1} ${y1}H${x2}V${y2}H${x1}Z`;
        startC = -1;
      }
    }
  }

  return d ? `path('${d}')` : "path('M0 0Z')";
}
