const shell = require('shelljs');
const fs = require('fs');

shell.cd('packages/docs');
shell.exec('yarn install');
shell.exec('yarn build');

fs.copyFileSync('./static/sign-in.html', './static/public/sign-in.html');
