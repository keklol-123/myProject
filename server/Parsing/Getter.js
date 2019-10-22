const request = require('request-promise');

const getHtml = async (link) => {
   let html;
   await request(link).then(val => {html = val})
   return html
} 


module.exports = getHtml