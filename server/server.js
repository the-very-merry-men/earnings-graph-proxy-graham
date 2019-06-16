const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const request = require('request');

const stocks = require('./stocks');

const app = express();

const PORT = 3003;

app.use(express.static(path.join(__dirname,'../client/public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/stocks/:stock/earnings', (req, res) => {
  // const newUrl = 'http://52.14.233.205:3000';
  const newUrl = 'http://localhost:3000';
  request(`${newUrl}/api/stocks/${req.params.stock}/earnings`).pipe(res);
});

app.post('/api/stocks/:stock/earnings', (req, res) => { //posting new earnings

  const newUrl = 'http://localhost:3000';
  request(`${newUrl}/api/stocks/${req.params.stock}/earnings`, (err, data) => {
    if (err) {
      console.log('theres been an error', err);
      res.status(500);
      res.send(err);
    }
    
    res.status(200);
    res.send(data);
  });
})

app.get('/api/stocks/:stock/price', (req, res) => {
  // const newUrl = 'http://3.17.135.66:3000';
  const newUrl = 'http://localhost:3002';
  request(`${newUrl}/api/stocks/${req.params.stock}/price`)
  .on('error', (err) => {console.log('error talking to localhost db!', err)})
  .pipe(res);
});

app.get('/api/stocks/:stock/paid', (req, res) => {
  const newUrl = 'http://localhost:3111';
  request(`${newUrl}/api/stocks/${req.params.stock}/`).pipe(res);
});

app.get('/api/stocks/:stock/prices/:time', (req, res) => {
  const newUrl = 'http://localhost:3001';
  request(`${newUrl}/api/stocks/${req.params.stock}/prices/${req.params.time}`).pipe(res);
});

app.get('/stocks/:stock', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/public/index.html'));
});

// port 3111  =>  prices paid
// port 3001  =>  stock chart
// port 3003  =>  earnings
// port 3002  =>  trade panel
//


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));