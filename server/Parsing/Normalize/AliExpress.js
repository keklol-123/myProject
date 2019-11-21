const normalize = price => {
  return parseFloat(
    price.replace(/[&#;a-zB-Z]/g, '').replace(/A0/g, '').replace(/,/g, '.')
  );
};

module.exports = normalize;
