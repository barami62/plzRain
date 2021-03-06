const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/time', (req, res, next) => {
    res.send('Success!!');
});


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));