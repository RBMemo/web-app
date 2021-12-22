const express = require('express');
const router = require('./routes');
const app = express();

// logging middleware
// morgan.token('req_body', (req, _) => JSON.stringify(req.body));
// const log_string = 'remote_address=:remote-addr date_time=[:date[clf]] '
//                  + 'method=:method url=:url HTTP/:http-version status=:status '
//                  + 'req_body=:req_body time=:response-time ms';
// app.use(morgan(log_string));

// body parsing middleware
app.use(express.json({extended: false}));
// app.use(express.urlencoded({ extended: true }));

// app routes
app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
