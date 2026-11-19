const fs = require('node:fs');
const path = require('node:path');

const workbookPath = path.resolve(
  __dirname,
  '..',
  'dist',
  'LISTA_PESSOAS.xlsx',
);

fs.rmSync(workbookPath, { force: true });
