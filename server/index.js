var express = require('express'),
  axios = require('axios').create({ headers: { 'Accept': 'application/json' } }),
  app = express();


// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('*', async (req, res) => {
  /** @type {String} */
  const code = req.query.code;
  try {
    console.log(`Authenticating Code: ${code.substr(0, 3)}...`);
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {},
      {
        params: {
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          code,
        },
      });
    if (response.data.error) {
      console.debug('Response:\n', response);
      throw new Error('Detected error response from Github');
    }
    console.log(`Recieved Access Token Code: ${response.data.access_token.substr(0, 3)}...`);
    res.status(response.status).send({ token: response.data.access_token });
  } catch (err) {
    console.error('Something went wrong!', err);
    res.status(500).send({ error: 'There was an error authenticating' });
  }

});

module.exports = app;
