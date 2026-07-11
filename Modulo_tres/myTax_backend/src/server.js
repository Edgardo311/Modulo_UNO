const env = require('./config/env');
const app = require('./app');

const PORT = env.port || env.PORT || 3000;
const HOST = env.host || env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
