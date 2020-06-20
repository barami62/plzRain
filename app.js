const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', indexRouter);

// app.get('/', (req, res) => res.sendFile('/index.html'));

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));