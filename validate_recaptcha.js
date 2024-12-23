require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

const REACT_APP_SITE_SECRET = process.env.REACT_APP_SITE_SECRET;
const REACT_APP_ENV = process.env.REACT_APP_ENV

app.use(cors());
app.use(express.json());

// Endpoint verify-captcha
app.post('/verify-captcha', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, error: 'Captcha token missing.' });
    }

    // Verify the CAPTCHA token using Google API
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: REACT_APP_SITE_SECRET,
          response: token,
        },
      }
    );

    if (data.success) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({
        success: false,
        'error-codes': data['error-codes'] || ['Unknown error'],
      });
    }
  } catch (error) {
    console.error('Error verifying CAPTCHA:', error.message);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`${REACT_APP_ENV} server is running on port ${port}`);
});