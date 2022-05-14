import { getFieldForDrawing } from "./getFieldForDrawing";

describe("getFieldForDrawing", () => {
  const field = [
    [0, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
  ];
  const fieldNext = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ];
  const expectedCellStates = [
    [0, 0, 0, 0],
    [0, -1, 0, -1],
    [0, 1, 0, 0],
    [0, 1, -1, 0],
  ];
  it("returns expected state", () => {
    const result = getFieldForDrawing(field, fieldNext);
    for (let i = 0; i < result.length; i += 1) {
      for (let j = 0; j < result[i].length; j += 1) {
        expect(result[i][j]).toBe(expectedCellStates[i][j]);
      }
    }
  });
});
