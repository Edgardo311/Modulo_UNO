const { URL } = require('url');
const axios = require('axios');
const cheerio = require('cheerio');
const { LEYES_URL, LEYES_BASE_URL } = require('../../config/env');

async function fetchLeyes() {
  const response = await axios.get(LEYES_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 ...' }
  });

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

          if (href && href.toLowerCase().includes('.pdf')) {
            pdf = href.startsWith('http')
              ? href
              : new URL(href, LEYES_BASE_URL).href;
          }
        });

      if (nombre && fechaReforma && pdf) {
        leyes.push({ nombre, fechaReforma, pdf });
      }
    }
  });

  return leyes;
}

module.exports = {
  fetchLeyes
};
