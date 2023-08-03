export const generateRange = (start: number, end: number) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

// start = 3, end = 6 ==> [3, 4, 5, 6]
