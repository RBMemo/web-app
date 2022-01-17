let host, protocol;
switch(process.env.NODE_ENV) {
	case 'production':
    host = 'CHANGE_ME';
    protocol = 'https';
		break;
	default:
    host = 'localhost:3001';
    protocol = 'http';
}

module.exports = {
  host
}
