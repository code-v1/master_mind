const express = require('express');
const path = require('path');
const favicon = require('serve-favicon')
const logger = require('morgan')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Put your API routes here before the 'catch all' route!

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})


const port = process.env.PORT || 5000;

app.listen(port, function(){
    console.log(`Express ap running on port ${port}`)
});