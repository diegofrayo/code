const shell = require('shelljs');

shell.cd('packages/docs');
shell.exec('yarn install');
shell.exec('yarn build');
