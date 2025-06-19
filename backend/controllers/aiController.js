const axios = require('axios');

exports.askAI = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'phi:latest',
      prompt: prompt,
      stream: false,
    });

    res.json({ response: response.data.response });
  } catch (error) {
    console.error('Error connecting to Ollama:', error.message);
    console.error('Ollama Error Details:', error.response?.data || error);
    res.status(500).json({ error: 'Failed to connect to AI' });
  }
};
