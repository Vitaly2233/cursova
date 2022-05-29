export function RandomNumbersOrder(array: number[]) {
  const res: number[] = [];
  const indexesUsed: number[] = [];

  const minIndex = 0;
  const maxIndex = array.length - 1;

  while (indexesUsed.length !== array.length) {
    const randIndex = GenerateRandom(minIndex, maxIndex);

    if (indexesUsed.includes(randIndex)) continue;

    indexesUsed.push(randIndex);
    res.push(array[randIndex]);
  }
  return res;
}

function GenerateRandom(min: number, max: number) {
  let difference = max + 1 - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
}
