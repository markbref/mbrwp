let env = require('dotenv').config({path: '.env'});

const parsed = env.parsed;

//console.log(parsed);

module.exports = parsed;