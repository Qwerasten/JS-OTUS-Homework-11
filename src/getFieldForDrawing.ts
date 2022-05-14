export function getFieldForDrawing(field: number[][], fieldNext: number[][]) {
  const result = Array.from<number>({ length: field.length }).map(() =>
    Array.from<number>({ length: field[0].length }).fill(0)
  );
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] === 1 && fieldNext[i][j] === 0) {
        result[i][j] = -1;
      } else {
        result[i][j] = field[i][j];
      }
    }
  }
  return result;
}
