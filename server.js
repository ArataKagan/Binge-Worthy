const express = require("express");
const app = express();
const path = require('path');


require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.send("API running"));

// api
app.use("/api/auth", require('./api/auth'));
app.use("/api/register", require('./api/register'));

// Serve static assets if it's in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));