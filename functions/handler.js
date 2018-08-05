'use strict';

exports.lambdaFun1 = (event, context, callback) => {
	const url= event.arguments.url;
	const username=event.username;

	switch (event.input) {
		case 'abc': {
			callback(null, `ABC, ${username}`);
			break;
		}

		default: {
			callback(`Unknown inpu, unable to process request for: ${event.input}`, null);
			break;
		}
	}
};