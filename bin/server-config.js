#! /usr/bin/env node
const join   = require('path').join;
const fs     = require('fs');
const shell  = require("shelljs");
const rfr    = require('rfr');
const env    = rfr('bin/lib/get-env.js');
const paths  = rfr('bin/lib/paths.js');

const sites = (env.MBRWP_SERVER === 'nginx') ? paths.nginxSites : paths.apache2Sites;

const bedrockConfTpl = join(sites, 'bedrock.conf.tpl');
const defaultConfTpl = join(sites, 'default.conf.tpl');

const bedrockConf = join(sites, 'bedrock.conf');
const defaultConf = join(sites, 'default.conf');

const replace = '<MBRWP_SERVER_NAME>';

// remove old config files
if (fs.existsSync(bedrockConf)) {

  shell.echo(`Deleting: ${bedrockConf}`)
  shell.rm(bedrockConf);
}

if (fs.existsSync(defaultConf)) {
  
  shell.echo(`Deleting: ${defaultConf}`);
  shell.rm(defaultConf);
}

if (env.MBRWP_INSTALL_BEDROCK === 'true') {

  shell.cp(bedrockConfTpl, bedrockConf);
  shell.sed('-i', replace, env.MBRWP_SERVER_NAME, bedrockConf);
  shell.echo(`Created ${bedrockConf}`);

} else {

  shell.cp(defaultConfTpl, defaultConf);
  shell.sed('-i', replace, env.MBRWP_SERVER_NAME, defaultConf);
  shell.echo(`Created ${defaultConf}`);
}