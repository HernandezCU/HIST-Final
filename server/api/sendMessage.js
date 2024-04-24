// export default defineEventHandler(async (event) => {
//     // Extract the JSON body from the event request
//     const body = await readBody(event)
//     console.log(body);
//     // Validate the incoming data
//     if (!body.message) {
//       return createError({
//         statusCode: 400,
//         statusMessage: 'Bad Request',
//         data: 'Message is required',
//       });
//     }
  
//     try {
//       // Setup the request options for the Ollama API
//       const response = await $fetch('http://localhost:11434/api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: {
//           model: "llama3", // Specify the model ID based on your needs
//           prompt: body.message,
//           stream: true // Assuming you want a non-streamed response for simplicity
//         }
//       });
  
//       // Return the response from the Ollama API
//       return response;
//     } catch (error) {
//       // Handle errors in communication with the Ollama API
//       return createError({
//         statusCode: error.statusCode || 500,
//         statusMessage: error.message || 'Internal Server Error'
//       });
//     }
//   });

import { readBody, createError, sendStream } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (!body.message) {
        throw createError({ statusCode: 400, statusMessage: 'Message is required' });
    }

    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "llama3",
                prompt: `${body.message} Make sure you only respond using plaintext and pretend you are an old west settler.`,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetch from Ollama API');
        }

        return sendStream(event, response.body);
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: error.message || 'Internal Server Error' });
    }
});
