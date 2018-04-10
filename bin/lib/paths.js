const join = require('path').join;
const rfr    = require('rfr');
const env    = rfr('bin/lib/get-env.js');

let paths = {
  bin       : 'bin',
  docker    : 'docker',
  vendor    : 'vendor',
  workspace : env.APP_CODE_PATH_HOST
};

paths['lib']          = join(paths.bin,    'lib');
paths['templates']    = join(paths.bin,    'templates');
paths['data']         = join(paths.docker, '.data');
paths['nginx']        = join(paths.docker, 'nginx');
paths['nginxSites']   = join(paths.nginx,   'sites');
paths['apache2']      = join(paths.docker, 'apache2');
paths['apache2Sites'] = join(paths.apache2, 'sites');


module.exports = paths;



