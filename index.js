const express = require('express');
const app = express();
const config = require('./config/express')(app);

const userRouter = require('./app/routes/index');

app.get('/', function (req, res) {
    res.send('Hello World!')
});


app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));