const mongoose = require('mongoose');
const { database } = require('./index');

const { uri, options } = database;

mongoose.connect(uri, options)
  .catch((err) => {
    console.error(`MongoDB initial connection error: \n${err}`);
  });

mongoose.connection.on('connected', () => {
  console.log('MongoDB has successfully connected!');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: \n${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection lost.');
});
