import Brick from "/src/brick";

export function buildLevel(game, level) {
  //create bricks from arrays
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        //can be added
        let position = {
          x: 80 * brickIndex,
          y: 75 + 24 * rowIndex
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

export const level1 = [
  //[0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
];
export const level2 = [
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
