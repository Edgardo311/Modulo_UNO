const leyesService = require('./leyes.service');

async function getLeyes(req, res, next) {
  try {
    const leyes = await leyesService.fetchLeyes();
    res.json(leyes);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLeyes
};
