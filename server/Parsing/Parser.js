
const cheerio = require('cheerio')
const getHtml = require('./Getter')

const aliNormalize= require('./Normalize/AliExpress')


const getPrice = async (link) => {

    if (link.includes('aliexpress')){

        let currentPrice;
        return await getHtml(link).then(html => {
            currentPrice = parseFloat(cheerio.load(html)('[itemprop="price"]').html().replace(/[&#;a-zB-Z]/g, '').replace(/A0/g, '').replace(/,/g, '.'))
            return currentPrice
        })

    }



    
   
}

// getPrice('https://ru.aliexpress.com/item/32893513513.html?spm=a2g0v.best.8.7.1feaMqLkMqLkly&scm=1007.17258.143211.0&pvid=7b19c1cb-5a0e-4597-a172-b1bde7705772').then(val => console.log(val))
// getPrice('https://ru.aliexpress.com/item/32887843572.html?spm=a2g0o.detail.1000023.1.56193a75P9FXUt').then(val => console.log(val))
// getPrice('https://ru.aliexpress.com/item/1000005913175.html?spm=a2g0v.best.8.13.1feaMqLkMqLkly&scm=1007.17258.143211.0&pvid=7b19c1cb-5a0e-4597-a172-b1bde7705772').then(val => console.log(val))


module.exports = getPrice