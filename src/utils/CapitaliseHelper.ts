export const capitalizeFirstLetter = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

export  const splitcapitalizeFirstLetter = (input:string) => {
    const words = input.split('_');
    const capitalizedWords = words.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word; 
      }
    });
    return capitalizedWords.join(' ');
  }