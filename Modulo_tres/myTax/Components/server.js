const { URL } = require('url');
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/api/leyes', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.diputados.gob.mx/LeyesBiblio/index.htm',
      { headers: { 'User-Agent': 'Mozilla/5.0 ...' } }
    );

    const $ = cheerio.load(response.data);
    const leyes = [];

    $('table tr').each((i, row) => {
      const cols = $(row).find('td');

      if (cols.length >= 4) {
        const nombre = $(cols[1])
          .find('a')
          .first()
          .text()
          .replace(/\s+/g, ' ')
          .trim();

        const fechaReforma = $(cols[2])
          .text()
          .replace(/\s+/g, ' ')
          .trim();

        let pdf = '';

        $(cols[3])
          .find('a')
          .each((_, a) => {
            const href = $(a).attr('href');
            console.log('PDF href encontrado:', href);

            if (href && href.toLowerCase().includes('.pdf')) {
              pdf = href.startsWith('http')
                ? href
                : new URL(href, 'https://www.diputados.gob.mx/LeyesBiblio/index.htm').href;
            }
          });

        if (nombre && fechaReforma && pdf) {
          leyes.push({ nombre, fechaReforma, pdf });
        }
      }
    });

    console.log(`Leyes encontradas: ${leyes.length}`);
    res.json(leyes);
  } catch (error) {
    console.error('ERROR SCRAPING:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, '0.0.0.0', () => {  
    console.log('Servidor ejecutándose en puerto 3000');});