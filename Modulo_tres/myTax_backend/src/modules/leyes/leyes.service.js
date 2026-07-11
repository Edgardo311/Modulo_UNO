const leyesRepository = require('./leyes.repository');

async function fetchLeyes() {
  return leyesRepository.fetchLeyes();
}

module.exports = {
  fetchLeyes
};
