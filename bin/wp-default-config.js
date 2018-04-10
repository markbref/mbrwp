const shell  = require("shelljs");
const rfr    = require('rfr');
const env    = rfr('bin/lib/get-env.js');
const paths  = rfr('bin/lib/paths.js');

const cliCommandstr = rfr('bin/lib/cli-command-string.js');

const argv = {
  _ : ['config', 'create'],
  dbname:   env.MYSQL_DATABASE,
  dbuser:   env.MYSQL_USER,
  dbpass:   env.MYSQL_PASSWORD,
  dbhost:   env.MBRWP_DB_HOST,
  dbprefix: env.MBRWP_DB_PREFIX,
  "skip-check": true,
  "extra-php": `define( "WP_DEBUG", true ); define( "WP_DEBUG_LOG", true );`
}

command = cliCommandstr('wp', argv);


shell.echo(`Executing: ${command}`);
shell.exec(command);
