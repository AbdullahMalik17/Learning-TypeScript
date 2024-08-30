function truncate(num, places = 0, roundOff = false) {
  const sign = Math.abs(num) === num ? 1 : -1;
  num = Math.abs(num);
  let result = Math.trunc(num);
  const decimals = parseFloat((num - result).toFixed(places + 1));
  if (places === 0) {
    const firstDigit = Math.trunc(10 * decimals);
    if (roundOff && ((result & 1) === 1 && firstDigit >= 5 || firstDigit > 5)) {
      result++;
    }
  } else if (places > 0) {
    const offset = Math.pow(10, places);
    let remainder = Math.trunc(decimals * offset);
    const lastDigit = Math.trunc(decimals * offset * 10) % 10;
    if (roundOff && lastDigit > 5) {
      remainder += 1;
    }
    result = (result * offset + remainder) / offset;
  } else if (places < 0) {
    const offset = Math.pow(10, -1 * places);
    let excess = result % offset;
    result = Math.max(0, result - excess);
    if (roundOff && sign === -1) {
      while (excess > 10) {
        excess -= excess % 10;
      }
      if (result > 0 && excess >= 5) {
        result += offset;
      }
    }
  }
  return result * sign;
}
export {
  truncate
};
