const express = require('express');

const app = express();

app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on 127.0.0.1:${PORT}`));
