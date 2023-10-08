const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); // favicon middleware
const logger = require('morgan'); // logger middleware
	
const app = express();
	
app.use(logger('dev'));
app.use(express.json()); // body parser middleware

app.use(express.json());
	
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); // build folder pointing to favicon
app.use(express.static(path.join(__dirname, 'build'))); // serves static assets

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});

