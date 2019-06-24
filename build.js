const fs = require('fs');
const shell = require('shelljs');
const { argv } = require('yargs');

const PROJECTS = ['components', 'utilities', 'docs'];

const buildDocs = () => {
  shell.cd('packages/docs');

  PROJECTS.forEach(project => {
    shell.cd(`../${project}`);
    shell.exec('yarn install');
  });

  PROJECTS.forEach(project => {
    shell.cd(`../${project}`);
    shell.exec('yarn build');
  });

  fs.copyFileSync('./static/sign-in.html', './static/public/sign-in.html');
  fs.copyFileSync('./static/netlify.toml', './static/public/netlify.toml');
};

const buildAll = () => {
  shell.cd('packages/docs');

  PROJECTS.filter(p => p !== 'docs').forEach(project => {
    shell.cd(`../${project}`);
    shell.exec('yarn build');
  });
};

const lintAll = () => {
  shell.cd('packages/docs');

  PROJECTS.forEach(project => {
    shell.cd(`../${project}`);
    shell.exec('yarn lint');
  });
};

if (argv['build-docs']) {
  buildDocs();
} else if (argv['build-all']) {
  buildAll();
} else if (argv['lint-all']) {
  lintAll();
} else {
  console.log('Please type an available option');
}
