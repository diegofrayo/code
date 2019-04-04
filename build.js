const shell = require('shelljs');
const fs = require('fs');

shell.cd('packages/docs');
shell.exec('yarn install');
shell.exec('yarn build');

fs.copyFileSync(
  './packages/docs/static/sign-in.html',
  './packages/docs/static/public/sign-in.html',
);
