#! /usr/bin/env node
const join   = require('path').join;
const fs     = require('fs');
const shell  = require("shelljs");
const rfr    = require('rfr');
const env    = rfr('bin/lib/get-env.js');
const paths  = rfr('bin/lib/paths.js');

const server = env.MBRWP_SERVER;
const bedrock = (env.MBRWP_INSTALL_BEDROCK === 'true')
const install = bedrock ? 'bedrock' : 'default';

let command = 
`npm run docker:down && \
npm run clean:workspace && \
npm run server:conf && \
npm run docker:build:all && \
npm run docker:up:${server} && \
npm run wp:${install}:download && \
`;

if (bedrock) {
  command = command + 
  `npm run wp:bedrock:env &&`;
} else {
  command = command + 
  `npm run wp:default:config &&`;
}

command = command +
`npm run wp:cli:install && \
npm run wp:cli:permalinks:rewrite
`;

//shell.echo(command);

shell.exec(command);