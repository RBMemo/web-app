const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const { host } = require('./swagger_config');
const { version, name: title } = require('../package.json');

const doc = {
	info: {
		version,
		title,
		description: "Docs for web app API"
	},
	host,
	basePath: "/",
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	definitions: {}
}

const outputFile = './docs/swagger_file.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
