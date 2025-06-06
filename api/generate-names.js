export default async function handler(req, res) {
  // Enable CORS for your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    
    if (!anthropicApiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `Generate exactly 3 unique, creative band names for tonight's performance. Make them catchy, memorable, and suitable for any music genre. Return them as a simple JSON array like this: ["Band Name 1", "Band Name 2", "Band Name 3"]. No other text or explanation, just the JSON array.`
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const bandNamesText = data.content[0].text;
    
    // Parse the JSON response from Claude
    const bandNames = JSON.parse(bandNamesText);
    
    // Validate we got 3 names
    if (!Array.isArray(bandNames) || bandNames.length !== 3) {
      throw new Error('Invalid response format from Claude');
    }

    return res.status(200).json({ names: bandNames });

  } catch (error) {
    console.error('Error generating band names:', error);
    
    // Return fallback names if API fails
    const fallbackNames = [
      'The Midnight Echoes',
      'Electric Dreamers', 
      'Cosmic Thunder'
    ];
    
    return res.status(200).json({ 
      names: fallbackNames,
      fallback: true 
    });
  }
}