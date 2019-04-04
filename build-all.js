const shell = require('shelljs');

shell.cd('packages/docs');

['components', 'form', 'styles', 'validator'].forEach(project => {
  shell.cd(`../${project}`);
  shell.exec('yarn build');
});
