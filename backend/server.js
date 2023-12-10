const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

let count = 9;

app.get('/api/weather/current', async (req, res) => {
  const location = req.query.location;
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=45b8474fde374c41ac3134812232811&q=${location}&aqi=no`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/api/weather/historical', async (req, res) => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/history.json?key=45b8474fde374c41ac3134812232811&q=London&dt=2023-12-0${count}`)
        count--;
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
