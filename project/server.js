require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Database connection error:', err);
});


app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/airplanes', require('./routes/airplanes'));
app.use('/api/flights', require('./routes/flights'));
app.use('/api/airports', require('./routes/airports'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/tickets', require('./routes/tickets'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));