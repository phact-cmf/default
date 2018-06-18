window.getNumEnding = (num, str1, str2, str3) => {
  const end1 = str1 || 'штуку';
  const end2 = str2 || 'штуки';
  const end3 = str3 || 'штук';

  if (num === 0) {
    return end3;
  }

  let value = num || 1;
  value %= 100;

  if (value === 0) {
    return end3;
  }

  if (value > 10 && value < 20) { return end3; }

  value = num % 10;
  if (value === 1) { return end1; } else if (value > 1 && value < 5) { return end2; }
  return end3;
};
