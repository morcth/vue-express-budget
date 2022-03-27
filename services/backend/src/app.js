const express = require('express');
const UserRouter = require('./user/UserRouter');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({}));
app.use(UserRouter);

module.exports = app;
