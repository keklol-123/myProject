const getHtml = require('./Getter');

const cheerio = require('cheerio');

const getPrice = (link) => {

    if (link.includes('ebay')){
       getHtml(link).then((html) => {
        console.log(cheerio.load(html)("[itemprop='price']").text())
    })

    }
    if(link.includes('ozon')){
        console.log(11)
        getHtml(link).then((html) => {
            console.log(cheerio.load(html)('.price-number').text())
    })
}

    
    // getHtml(link).then((html) => {
    //     console.log(cheerio.load(html)('.product-details__price--value', '.price-sale').text().slice(1))
    // })
}

getPrice('https://www.ebay.com/itm/Oakley-Flight-Jacket-Sunglasses-OO9401-1237-White-Prizm-Ruby-Lens/254346291304?_trkparms=pageci%3A3d7206d4-fcd4-11e9-bd77-74dbd18023d5%7Cparentrq%3A2832397516e0a9cbb824b167fff9404a%7Ciid%3A1')

getPrice('https://www.ozon.ru/context/detail/id/160742817/')