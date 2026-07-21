const fs = require('fs');
const buf = fs.readFileSync('o-guarda-chuva-molhado.png');
const text = buf.toString('ascii').replace(/[^a-zA-Z0-9 \{\}\":,\.\n\r-]/g, '');
console.log(text.substring(0, 1000));
