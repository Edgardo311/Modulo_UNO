const fetch = require('node-fetch');
const cheerio = require('cheerio');
(async()=>{
  const html = await fetch('https://www.diputados.gob.mx/LeyesBiblio/index.htm',{headers:{'User-Agent':'Mozilla/5.0'}}).then(r=>r.text());
  const $ = cheerio.load(html);
  const selectors = [
    'table a[href^="ref/"]',
    'main a[href^="ref/"]',
    'article a[href^="ref/"]',
    'div a[href^="ref/"]',
    'a[href^="ref/"]'
  ];
  for (const sel of selectors) {
    const items = $(sel).toArray().map(a=>({text:$(a).text().trim().replace(/\s+/g,' '), href:$(a).attr('href'), parent:$(a).parent().prop('tagName'), grand:$(a).parent().parent().prop('tagName')}));
    console.log('\nSELECTOR', sel, 'COUNT', items.length);
    console.log('FIRST10', items.slice(0,10));
  }
})();
