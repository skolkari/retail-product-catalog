export const calculateDamerauLevenshteinDistance = (
  a: string,
  b: string
): number => {
  const dp: number[][] = [];

  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );

      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost); // transposition
      }
    }
  }

  return dp[a.length][b.length];
};

export const fuzzySearch = (
  productName: string,
  stringToMatch: string,
  maxDistance: number
): boolean => {
  // check if stringToMatch exists as a substring in productName
  if (
    productName
      .split(" ")
      .join()
      .toLowerCase()
      .includes(stringToMatch.toLowerCase())
  ) {
    return true;
  }

  // check if there is atleast one character in common between productName and stringToMatch
  // then only calculate the distance
  if (
    productName
      .toLowerCase()
      .split("")
      .some((char) => stringToMatch.toLowerCase().includes(char))
  ) {
    const arr = productName.split(" ");
    let distances = [];

    for (let i = 0; i < arr.length; i++) {
      distances.push(
        calculateDamerauLevenshteinDistance(arr[i], stringToMatch)
      );
    }

    const minDistance = Math.min(...distances);

    return minDistance <= maxDistance;
  }

  return false;
};
