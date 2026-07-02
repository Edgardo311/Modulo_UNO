const fetch = require('node-fetch');
const cheerio = require('cheerio');
(async()=>{
  const html = await fetch('https://www.diputados.gob.mx/LeyesBiblio/index.htm',{headers:{'User-Agent':'Mozilla/5.0'}}).then(r=>r.text());
  const $ = cheerio.load(html);
  const anchors = $('a[href]').toArray().map(a=>({
    text:$(a).text().trim().replace(/\s+/g,' '),
    href:$(a).attr('href'),
    parent:$(a).parent().prop('tagName'),
    grand:$(a).parent().parent().prop('tagName'),
    pclass:$(a).parent().attr('class')||'',
    gclass:$(a).parent().parent().attr('class')||'',
    id:$(a).parent().attr('id')||''
  }));
  console.log('TOTAL ANCHORS', anchors.length);
  const filtered = anchors.filter(x=>/\.htm$/i.test(x.href)||/\.pdf$/i.test(x.href));
  console.log('VALID HTM/PDF ANCHORS', filtered.length);
  console.log('SAMPLE');
  filtered.slice(0,120).forEach((x,i)=>console.log(i+1, JSON.stringify(x)));
})();
