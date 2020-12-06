const express = require('express');
//get DB from config
const connectdb = require('./config/db');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;


//connect DB
connectdb();

//connect body parser
app.use(express.json({
    extended: true
}));

//basic route
app.get('/', (req, res) => {
    res.send('API Running');
});

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});