const fetch = require('node-fetch');
(async () => {
  const response = await fetch('https://www.diputados.gob.mx/LeyesBiblio/index.htm', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  const html = new TextDecoder('iso-8859-1').decode(buffer);
  const cheerio = require('cheerio');
  const $ = cheerio.load(html, { decodeEntities: true });
  const first = $('table a[href^="ref/"]').first();
  console.log('FIRST_NAME=', JSON.stringify(first.text().trim().replace(/\s+/g, ' ')));
})();
