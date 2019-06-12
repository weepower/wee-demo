const path = require('path');

const { weeCore } = require(path.resolve('build/paths'));
const { logError, logSuccess } = require(`${weeCore}/utils`);
const spawn = require('child_process').spawn;

// Refer to https://github.com/tj/commander.js for documentation
// Properties defined below directly correspond to commander API
module.exports = {
    name: 'demo',
    description: 'launch demo site',
    usage: '- wee demo',
    options: [],
    action(config, options) {
        // Execute npm run
        const child = spawn('npm', ['run', 'demo', '--ansi'], {
            cwd: config.rootPath,
            stdio: 'inherit',
        });

        child.on('error', (data) => {
            utils.logError(data);
        });
    },
};