export const playgGerman = (text: string): void => {
  if (typeof window !== 'undefined') {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'de-DE';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }
};