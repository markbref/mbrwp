
/**
 * Return command string for a cli vendor to be executed in docker workspace
 * 
 * @param String vendor identifier for cli vendor, eg 'wp' or 'composer'
 * @param {*} argv object that match yargs-parser process.argv.slice(2)
 */
const wpCliCommand = function(vendor, argv) {

  if (!vendor && !argv) return false;

  let inputs = '';

  Object.keys(argv).forEach(key => {

    if (argv[key].constructor.name == 'Array') {

      inputs = inputs + argv[key].join(' ') + ' ';

    } else {

      const flag = (argv[key] === true) ? `--${key} ` : `--${key}='${argv[key]}' `; 

      inputs = inputs + flag;
    }

  });

  const command = 
  `docker-compose exec -T --user=laradock workspace ${vendor} ${inputs}`;

  return command;
}

module.exports = wpCliCommand;