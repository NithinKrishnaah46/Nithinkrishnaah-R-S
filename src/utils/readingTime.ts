/**
 * Calculates estimated reading time based on text content length.
 * Standard technical comprehension rate is typically ~180-200 words per minute.
 *
 * @param content String or array of strings containing the text to estimate
 * @param wordsPerMinute Average words read per minute (default 180)
 * @returns Object with minutes, word count, and formatted text
 */
export function estimateReadingTime(
  content: string | (string | undefined | null)[] | undefined | null,
  wordsPerMinute: number = 180
): { minutes: number; words: number; text: string } {
  if (!content) {
    return { minutes: 1, words: 0, text: '1 min read' };
  }

  let fullText = '';
  if (Array.isArray(content)) {
    fullText = content.filter(Boolean).join(' ');
  } else {
    fullText = String(content);
  }

  // Remove markdown symbols and extra whitespace
  const sanitized = fullText
    .replace(/[#*`_~[\]()\-+>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!sanitized) {
    return { minutes: 1, words: 0, text: '1 min read' };
  }

  const words = sanitized.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return {
    minutes,
    words,
    text: `${minutes} min read`
  };
}
