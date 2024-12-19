const LanguageDetect = require('languagedetect');

const lngDetector = new LanguageDetect();

/**
 * Detects if the input text is in Portuguese or English.
 * @param text - The text to be analyzed.
 * @returns 'pt' for Portuguese, 'en' for English, or null if neither.
 */
function detectLanguage(text: string): string | null {
    const result = lngDetector.detect(text, 1); // Get top 1 language prediction

    // Mapping of detected languages to their codes
    const languageMap: { [key: string]: string } = {
        'portuguese': 'pt',
        'english': 'en'
    };

    if (result.length > 0) {
        const [language] = result[0]; // Get the most likely language
        return languageMap[language] || 'en'; // Return mapped code or null if not found
    }
    return null; // Return null if no language is detected
}

export const lang = {
    detectLanguage
}