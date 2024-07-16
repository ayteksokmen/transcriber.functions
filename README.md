# transcriber.functions
 This repository contains Firebase Cloud Functions to handle audio transcription requests using the Whisper API.

## Whisper Transcription Function

	•	Endpoint: /whisperTranscription
	•	Method: POST
	•	Description: This function accepts a base64-encoded audio String, sends it to the Whisper API for transcription, and returns the transcribed text.

Request

	•	URL: https://us-central1-transcriber-2a15d.cloudfunctions.net/whisperTranscription
 	•	Headers: Content-Type: application/json
	•	Body: 
 			{  
  			   "audioFile": "your_base64_encoded_audio_string"  
    		}

Response

	•	Success: 
 			{
  			   "result": "transcribed text"
    		}
      
	•	Error: 
 			{
  			   "error": "error message"
    		}

Example Usage with Postman

	1.	Open Postman.
	2.	Create a New Request.
	3.	Set the Request Type to POST.
	4.	Enter the URL: https://us-central1-transcriber-2a15d.cloudfunctions.net/whisperTranscription
 	5.	Set the Headers:
		•	Key: Content-Type
		•	Value: application/json
	6.	Set the Body:
		•	Select raw and set the type to JSON.
		•	Add the JSON payload with the Base64-encoded audio string: 
 			{  
  			   "audioFile": "your_base64_encoded_audio_string"  
    		}
