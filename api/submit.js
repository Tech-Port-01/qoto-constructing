// This file handles form submissions securely using environment variables
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the Formspree URL from environment variables
    const formUrl = process.env.qFORM_URL;
    
    if (!formUrl) {
      return res.status(500).json({ error: 'Form URL is not configured' });
    }

    // Forward the request to Formspree
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit form');
    }

    // Return success response to client
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ error: 'Failed to submit form' });
  }
}