const fetch = require('node-fetch');
(async () => {
  const res = await fetch('http://localhost:3000/leyes?tipo=leyes');
  const data = await res.json();
  console.log('COUNT=', data.length);
  console.log('FIRST=', JSON.stringify(data[0], null, 2));
})();
