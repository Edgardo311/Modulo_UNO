const express = require('express');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const app = express();

function sanitizarHtml(html) {
  const $ = cheerio.load(html, { decodeEntities: true });

  $('script, style, noscript, link, meta, svg, img').remove();
  $('header, nav, footer, aside, form, .menu, .navbar, .top, .logo, .breadcrumb, .social, .share, .news-info-list, .header-social').remove();

  $('body, main, article, section, table, p, h1, h2, h3, h4, li, ul, ol, a').each((_, el) => {
    const $el = $(el);
    $el.attr('style', null);
  });

  const body = $('body').html() || $('main').html() || $('article').html() || $('table').first().html() || '';

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ley</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; color: #111; background: #fff; margin: 0; padding: 10px; line-height: 1.4; }
      p, li, td, th { font-size: 15px; }
      table { width: 100%; border-collapse: collapse; }
      td, th { border: 1px solid #ddd; padding: 6px; vertical-align: top; }
      a { color: #0a5bb4; text-decoration: underline; }
      h1, h2, h3 { color: #0f5a0f; margin-top: 10px; }
    </style>
  </head>
  <body>${body}</body>
</html>`;
}

app.get('/leyes', async (req, res) => {
  try {
    const urlFuente = 'https://www.diputados.gob.mx/LeyesBiblio/index.htm';

    const response = await fetch(urlFuente, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8',
        'Referer': 'https://www.diputados.gob.mx/'
      },
      timeout: 30000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const html = new TextDecoder('iso-8859-1').decode(buffer);
    const $ = cheerio.load(html, { decodeEntities: true });

    const mapa = new Map();

    $('table a[href^="ref/"]').each((_, el) => {
      const rawHref = $(el).attr('href') || '';
      const rawText = $(el).html() || '';

      if (/facebook|twitter|youtube|mailto/i.test(rawHref)) return;

      const nombre = cheerio.load(`<html><body>${rawText}</body></html>`)
        .root()
        .text()
        .replace(/\s+/g, ' ')
        .trim();

      if (!nombre) return;

      const url = rawHref.startsWith('http')
        ? rawHref
        : `https://www.diputados.gob.mx/LeyesBiblio/${rawHref}`;

      if (!mapa.has(url)) {
        mapa.set(url, { nombre, url });
      }
    });

    const lista = Array.from(mapa.values());

    res.json(lista);
  } catch (error) {
    console.error('Error al cargar leyes:', error);
    res.status(500).json({ error: 'Error al cargar leyes' });
  }
});

app.get('/leyes-html', async (req, res) => {
  try {
    const url = decodeURIComponent(req.query.url || '');

    if (!url) {
      return res.status(400).json({ error: 'Falta url' });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-MX,es;q=0.9,en;q=0.8',
        'Referer': 'https://www.diputados.gob.mx/'
      },
      timeout: 30000
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const html = new TextDecoder('iso-8859-1').decode(buffer);

    res.send(sanitizarHtml(html));
  } catch (error) {
    console.error('Error al cargar HTML de ley:', error);
    res.status(500).send('<html><body>Error al cargar la ley.</body></html>');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000/leyes');
});
