const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { authenticateToken } = require('./auth');
const { MarkdownTextSplitter } = require('langchain/text_splitter');
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Function to parse markdown using LangChain
async function parseMarkdown(text) {
  const splitter = new MarkdownTextSplitter({
    chunkSize: 10000,
    chunkOverlap: 0
  });
  const docs = await splitter.createDocuments([text]);
  return docs[0].pageContent.replace(/[*#]/g, '').trim();
}

router.post('/generate', async (req, res) => {
  try {
    const { date, data } = req.body;
    
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'No usage data provided' });
    }

    const totalTime = Object.values(data).reduce((sum, time) => sum + time, 0);
    const sortedDomains = Object.entries(data)
      .sort(([,a], [,b]) => b - a)
      .map(([domain, time]) => ({
        domain,
        time: Math.round(time / 1000 / 60), // Convert to minutes
        percentage: ((time / totalTime) * 100).toFixed(1)
      }));

    const prompt = `Analyze this browsing data for ${date} and provide friendly, concise insights:

Total time: ${Math.round(totalTime / 1000 / 60)} minutes

Top sites:
${sortedDomains.map(({domain, time, percentage}) => 
  `- ${domain}: ${time}min (${percentage}%)`
).join('\n')}

Provide brief, friendly suggestions for:
1. What's working well in your browsing habits
2. Time management suggestions
3. One website alternative that could be useful
4. A gentle tip to stay focused

Keep it short, positive, and conversational.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    
    const cleanedInsights = await parseMarkdown(response.text());
    
    res.json({
      date,
      insights: cleanedInsights,
      summary: {
        totalTime: Math.round(totalTime / 1000 / 60),
        topDomains: sortedDomains.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('AI insights error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to generate insights',
      details: error.message || 'Unknown error'
    });
  }
});

module.exports = router;