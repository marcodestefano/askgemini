# askgemini

API wrapper for Gemini Pro https://ai.google.dev/tutorials/node_quickstart

API available on : https://askgemini.onrender.com/api

endpoint:
text (POST) - with Content-Type application/json 

input parameters:
```
apiKey:         your Gemini API Key - get one from https://makersuite.google.com/app/apikey
textPrompt:     your text prompt
```

output:
a json containing the message answer from Gemini

sample input:
```
{
    "apiKey": "myApiKey",
    "textPrompt": "What's your name?"
}
```

sample output:
```
{
    "message": "I am Gemini, a multimodal AI language model developed by Google.
}
```
