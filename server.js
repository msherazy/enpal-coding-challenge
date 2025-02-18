import express from 'express';
import { ENV } from './src/config';

import betterLogging from 'better-logging';
import { testConnection } from './src/database';
import { appRouter } from './src/routes';
import { ErrorController } from './src/controllers';

betterLogging(console, {
	format: ctx => {
		const gray = '\x1b[90m';
		const reset = '\x1b[0m';

		return `${gray}[ ${new Date().toUTCString()} ]${reset} ${ctx.type} ${ctx.msg}`;
	},
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(appRouter);

app.use(ErrorController.globalError);

testConnection().then(() => {
	app.listen(ENV.PORT, () => {
		console.log(`Server is running on port ${ENV.PORT}`);
	});
});
