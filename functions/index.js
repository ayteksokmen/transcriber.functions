const OpenAI = require("openai");
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const os = require('os');

admin.initializeApp();

const openaiApi = new OpenAI({ apiKey: functions.config().openai.key });

exports.whisperTranscription = functions.https.onRequest(async (request, response) => {
  // Enable CORS
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');

  if (request.method === "OPTIONS") {
    // Preflight request. Just send OK status.
    response.status(204).send('');
    return;
  }

  // Check for POST request
  if (request.method !== "POST") {
    response.status(400).send('Please send a POST request');
    return;
  }

  try {
    // Extract parameters from the request body
    const { audioFile } = request.body;

    // Validation
    if (!audioFile) {
      response.status(400).send('Missing "audioFile" in the request body');
      return;
    }

    // Prepare the payload for the Whisper API
    // const formData = new FormData();
    // formData.append('file', Buffer.from(audioFile, 'base64'), 'audio.m4a');

    const buffer = Buffer.from(audioFile, 'base64');

    // Define a temporary file path
    const tmpdir = os.tmpdir();
    const filePath = path.join(tmpdir, 'audio.m4a');

    // Write the buffer to a file
    fs.writeFileSync(filePath, buffer);

    // const blob = new Blob([buffer], { type: 'audio/mp3' });
    // const file = new File([blob], 'test.mp3', { type: 'audio/mp3' });
            
    // Call the Whisper API
    const whisperResponse = await openaiApi.audio.transcriptions.create({
      model: "whisper-1",
      file: fs.createReadStream(filePath),
    });

    // const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${functions.config().openai.key}`,
    //     ...formData.getHeaders()
    //   },
    //   body: formData
    // });

    // const transcriptionResult = await whisperResponse.json();

    // Send the response back
    response.json(whisperResponse);
  } catch (error) {
    console.error('Whisper API call failed:', error);
    response.status(500).send('Internal Server Error');
  }
});