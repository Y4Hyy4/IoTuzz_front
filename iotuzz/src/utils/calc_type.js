export const calc_type = (obj) => {
  let a = [0, 0, 0, 0]
  let max = 2;

  Object.values(obj).forEach((value) => {
    if (value == "fuzzware") {
      a[0]++;
      if (a[0] > a[max]) max = 0;
    } else if (value == "μEmu") {
      a[1]++;
      if (a[1] > a[max]) max = 1;
    } else if (value == "p²im") {
      a[2]++;
      if (a[2] > a[max]) max = 2;
    } else {
      a[3]++;
      if (a[3] > a[max]) max = 3;
    }
  });
  return max
}
