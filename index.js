require('dotenv').config();
const express = require('express');
const app = express();

const mongoURL = process.env.MONGO_URL;
const mongoose = require('mongoose');
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.error(err);
  });

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('heurm server is listening to port ' + port);
});
