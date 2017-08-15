const path = require('path');
const { weeCore } = require(path.resolve('build/paths'));
const { logError, logSuccess } = require(`${weeCore}/utils`);

// Refer to https://github.com/tj/commander.js for documentation
// Properties defined below directly correspond to commander API
module.exports = {
	name: 'example',
	description: 'example command description',
	usage: '- wee example [options]',
	options: [
		['-t, --test <name>', 'option with a value'],
		['-t2, --test2', 'option without a value']
	],
	action(config, options) {
		// Require test option be provided
		// if (typeof options.test !== 'string') {
		// 	logError('--test is required');
		// 	process.exit();
		// }

		logSuccess(`Example command successful.`);
	}
};