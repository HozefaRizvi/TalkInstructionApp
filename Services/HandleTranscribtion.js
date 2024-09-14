export const handleTranscriptionResult = (transcribedText) => {
    if (transcribedText) {
      const normalizedText = transcribedText.trim().toLowerCase();
  
      if (normalizedText.includes('turn on the flashlight') || normalizedText.includes('turn the flashlight on')) {
        return true;  
      }
      if (normalizedText.includes('turn off the flashlight') || normalizedText.includes('turn off flashlight on')) {
        return false; 
      }
    }
    return null;
  };
  