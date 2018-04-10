#! /usr/bin/env node
const shell  = require("shelljs");
const rfr    = require('rfr');
const env    = rfr('bin/lib/get-env.js');
const paths  = rfr('bin/lib/paths.js');




const url    = env.MBRWP_WP_HOME;
const title  = env.MBRWP_WP_TITLE;
const user   = env.MBRWP_WP_ADMIN_USER;
const pass   = env.MBRWP_WP_ADMIN_PASS;
const email  = env.MBRWP_WP_ADMIN_EMAIL;

const command = 
`docker-compose exec -T --user=laradock workspace \
wp core install \
--url='${url}' \
--title='${title}' \
--admin_user='${user}' \
--admin_password='${pass}' \
--admin_email='${email}'
`;

shell.exec(command);
shell.echo(`Site ${title} installed`);