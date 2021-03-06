const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const app = express();
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Mongo Connect
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

// Use Routes
app.use(cors());
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/github', require('./routes/api/github'));
app.use('/api/notes', require('./routes/api/notes'));
app.use('/api/items', require('./routes/api/items'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
