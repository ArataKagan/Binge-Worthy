const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
    res.send("Welcome to TV list app");
})

// app.get('/api/hello', (req, res) => {
//     res.send({express: 'Hello from Express'});
// });

// Serve static assets if it's in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));