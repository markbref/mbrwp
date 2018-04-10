#! /usr/bin/env node
const join = require('path').join;
const shell  = require("shelljs");
const rfr    = require('rfr');
const crypto = require('secret-utils');
const env    = rfr('bin/lib/get-env.js');
const paths  = rfr('bin/lib/paths.js');

// path is from project root
const bedrockEnvFile = join(paths.templates, 'bedrock.env'); // './bin/templates/bedrock.env';
const tmpFile        = bedrockEnvFile + '.tmp';
const workspacePath  = paths.workspace;

const prefix = 'MBRWP';

const dbName   = `<${prefix}_DB_NAME>`;
const dbUser   = `<${prefix}_DB_USER>`;
const dbPass   = `<${prefix}_DB_PASSWORD>`;
const dbPrefix = `<${prefix}_DB_PREFIX>`;
const dbHost   = `<${prefix}_DB_HOST>`;
const wpEnv    = `<${prefix}_WP_ENV>`;
const wpHome   = `<${prefix}_WP_HOME>`;

// make a temp file to search and replace
shell.cp(bedrockEnvFile, tmpFile);

// lets replace those bad boys
shell.sed('-i', dbName,   env.MYSQL_DATABASE,    tmpFile);
shell.sed('-i', dbUser,   env.MYSQL_USER,        tmpFile);
shell.sed('-i', dbPass,   env.MYSQL_PASSWORD,    tmpFile);
shell.sed('-i', dbPrefix, env.MBRWP_DB_PREFIX,   tmpFile);
shell.sed('-i', dbHost,   env.MBRWP_DB_HOST,     tmpFile);
shell.sed('-i', wpEnv,    env.MBRWP_WP_ENV,      tmpFile);
shell.sed('-i', wpHome,   env.MBRWP_WP_HOME,     tmpFile);

for (let i = 0; i < 8; i++) {
  const salt = crypto.genSalt(64);
  shell.sed('-i', `<SALT${i}>`, salt, tmpFile);
}

// read result
const str = shell.head({'-n': 20}, tmpFile);

shell.echo('GENERATED BEDROCK .env file:');
shell.echo(str);

shell.mv(tmpFile, `${workspacePath}/.env`);
shell.echo('Genrated file moved to: ' + workspacePath);