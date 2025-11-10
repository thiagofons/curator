/**
 * Estimates reading time for a block of HTML/text content.
 * Heuristic accounts for words and image count.
 * @returns e.g., "03 Mins read"
 */
const readingTime = (content: string) => {
  const Wps = 275 / 60;

  let images = 0;
  const regex = /\w/;

  const words = content.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / Wps + imageSecs) / 60);

  if (minutes < 10) {
    if (minutes < 2) {
      return `"0${minutes} Min read`;
    }
    return `0${minutes} Mins read`;
  }
  return `${minutes} Mins read`;
};

export default readingTime;
