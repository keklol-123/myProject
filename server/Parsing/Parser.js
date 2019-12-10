
const cheerio = require('cheerio')
const getHtml = require('./Getter')

const aliNormalize= require('./Normalize/AliExpress')


const getPrice = async (link) => {

    if (link.includes('aliexpress')){

        let currentPrice;
        return await getHtml(link).then(html => {
            let currentPrice = cheerio.load(html)('[itemprop="price"]').html()
            if(!currentPrice)
                currentPrice = cheerio.load(html)('.current-price').html()
            currentPrice = aliNormalize(currentPrice)
            
            return currentPrice
        })

    }

    if (link.includes('amazon')){
        let currentPrice;
        return await getHtml(link).then(html => {
            let currentPrice = cheerio.load(html)('.price-large').html()
            if(!currentPrice)
                currentPrice = cheerio.load(html)('.priceBlockBuyingPriceString').html()
            if(!currentPrice)
                currentPrice = cheerio.load(html)('#newBuyBoxPrice').html()
            
            currentPrice = parseFloat(currentPrice.replace(/[$,]/g,''))
           
             return currentPrice
    })
}
}


module.exports = getPrice