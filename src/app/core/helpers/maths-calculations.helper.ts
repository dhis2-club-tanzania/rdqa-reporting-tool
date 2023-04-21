export function calculateVariance(numbers: number[]) {
  if (!numbers.length) {
    return 0;
  }
  const sum = numbers.reduce((acc, val) => acc + val);
  const { length: num } = numbers;
  const median = sum / num;
  let variance = 0;
  numbers.forEach((num) => {
    variance += (num - median) * (num - median);
  });
  variance /= num;
  return variance;
}

export function differenceBetweenTwoNumbers(numbers: number[]) {
  return Math.abs(numbers[0] - numbers[1]);
}
