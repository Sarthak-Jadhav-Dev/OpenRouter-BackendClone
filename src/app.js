require('dotenv').config();
const express = require('express');
const app = express();
const chatRouter = require('./routes/chat.routes');
const keysRouter = require('./routes/keys.routes');
const usageRouter = require('./routes/usage.routes')
const supabase = require('./model/supabaseClient');

app.use(express.json());

app.use('/api/layers/', chatRouter);
app.use('/api/keys/',keysRouter)
app.use('/api/usage',usageRouter)

module.exports = app;