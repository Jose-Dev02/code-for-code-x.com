export const calculateNumerology = (fullname: string): number => {
  fullname = fullname.toUpperCase().trim();

  fullname = fullname.replace(/[^A-Z ]/g, "");

  const letterToNumber: Record<string, number> = {
    A: 1,
    J: 1,
    S: 1,
    B: 2,
    K: 2,
    T: 2,
    C: 3,
    L: 3,
    U: 3,
    D: 4,
    M: 4,
    V: 4,
    E: 5,
    N: 5,
    W: 5,
    F: 6,
    O: 6,
    X: 6,
    G: 7,
    P: 7,
    Y: 7,
    H: 8,
    Q: 8,
    Z: 8,
    I: 9,
    R: 9,
  };

  const reduceNumber = (number: number): number => {
    if ([11, 22, 33].includes(number)) {
      return number;
    }

    while (number > 9) {
      number = number
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    }
    return number;
  };

  const nameParts: string[] = fullname.split(" ");
  const individualResults = nameParts.map((part) => {
    let partSum = 0;
    for (const letter of part) {
      if (letterToNumber[letter]) {
        partSum += letterToNumber[letter];
      }
    }

    return reduceNumber(partSum);
  });

  const finalSum = individualResults.reduce((sum, num) => sum + num, 0);

  const finalNumerologyNumber = reduceNumber(finalSum);

  return finalNumerologyNumber;
};
