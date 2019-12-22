const cheerio = require('cheerio');
const getHtml = require('./Getter');

const aliNormalize = require('./Normalize/AliExpress');

const getPrice = async link => {
  if (link.includes('aliexpress')) {
    return await getHtml(link).then(html => {
      let currentPrice = cheerio
        .load(html)('[itemprop="price"]')
        .html();
      if (!currentPrice)
        currentPrice = cheerio
          .load(html)('.current-price')
          .html();
      currentPrice = aliNormalize(currentPrice);

      return currentPrice;
    });
  }

  if (link.includes('amazon')) {
    return await getHtml(link).then(html => {
      let currentPrice = cheerio
        .load(html)('.price-large')
        .html();
      if (!currentPrice)
        currentPrice = cheerio
          .load(html)('.priceBlockBuyingPriceString')
          .html();
      if (!currentPrice)
        currentPrice = cheerio
          .load(html)('#newBuyBoxPrice')
          .html();

      currentPrice = parseFloat(currentPrice.replace(/[$,]/g, ''));

      return currentPrice;
    });
  }
  if (link.includes('ebay')) {
    let currentPrice;
    return await getHtml(link).then(html => {
         currentPrice = cheerio
        .load(html)('[class="display-price"]')
        .html();
      
        currentPrice = aliNormalize(currentPrice);

      return currentPrice;
    });
  }
  if(link.includes('wildberries')){
    let currentPrice;
    return await getHtml(link).then(html => {
         currentPrice = cheerio
        .load(html)('[class="final-cost"]')
        .html();
      
        currentPrice = parseFloat(aliNormalize(currentPrice).toString().slice(0,-2));

      return currentPrice;
    });
  }
};

module.exports = getPrice;
