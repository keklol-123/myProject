const normalize = price => {
  return parseFloat(
    removeCommas(price)
      .split('')
      .filter(val => val != ' ')
      .join(''),
  );
};

const removeCommas = price => {
  let newPrice = price;

  while (newPrice.includes(',')) newPrice = newPrice.replace(',', '.');
  return newPrice;
};

module.exports = normalize;
