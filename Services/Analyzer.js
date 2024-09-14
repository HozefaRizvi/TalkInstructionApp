
export default async function Analyzer(url) {
  try {
    const transcriptionResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'Authorization': '50f38f0d57dd4ee39bf97877391baa9e',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audio_url: url }),
    });

    if (!transcriptionResponse.ok) {
      const errorData = await transcriptionResponse.text();
      throw new Error(`Transcription API error! Status: ${transcriptionResponse.status}, Message: ${errorData}`);
    }
    const transcriptionData = await transcriptionResponse.json();
    const transcriptId = transcriptionData.id;
    let transcript = null;

    while (!transcript || transcript.status !== 'completed') {
      const checkResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          'Authorization': '50f38f0d57dd4ee39bf97877391baa9e',
        },
      });

      if (!checkResponse.ok) {
        const errorData = await checkResponse.text();
        throw new Error(`Polling API error! Status: ${checkResponse.status}, Message: ${errorData}`);
      }

      transcript = await checkResponse.json();
      console.log('Polling for completion:', transcript.status);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log('Transcription text:', transcript.text);
    return transcript.text; 

  } catch (error) {
    console.error('Error during API call:', error);
    return null; 
  }
}
