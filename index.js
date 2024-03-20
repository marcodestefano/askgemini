const express = require('express');
const app = express();
const PORT = process.env.PORT || 8888;
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.post('/api/text', async (req, res) => {
    if (req.method === 'POST' && req.headers['content-type'] === 'application/json') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                const apiKey = jsonData.apiKey;
                const textPrompt = jsonData.textPrompt;
                if (apiKey && textPrompt) {
                    const genAI = new GoogleGenerativeAI(apiKey);
                    const model = genAI.getGenerativeModel({
                        model: "gemini-pro", "safetySettings": [
                            {
                                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                                "threshold": "BLOCK_NONE"
                            },
                            {
                                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                                "threshold": "BLOCK_NONE"
                            },
                            {
                                "category": "HARM_CATEGORY_HATE_SPEECH",
                                "threshold": "BLOCK_NONE"
                            },
                            {
                                "category": "HARM_CATEGORY_HARASSMENT",
                                "threshold": "BLOCK_NONE"
                            }
                        ]
                    });
                    const result = model.generateContent(textPrompt).then(result => {
                        return result.response.text();
                    }).then(text => {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: text }));
                    })
                }
                else {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON data');
                }
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON data');
            }
        });
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Unsupported method or content type');
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});