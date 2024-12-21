import { WordTokenizer } from 'natural';
import { removeStopwords, eng, por } from 'stopword';
import natural from 'natural';

const langs = { 'en': eng, 'pt': por };

// Function to process the article and count word frequencies using stemming
function getMostCommon(article: string, lang: string) {
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(article);

    // Remove stopwords and filter unique words while counting occurrences
    const stopwords = langs[lang] || langs['en'];
    const frequencyMap: Record<string, number> = {};

    const cleanTokens = removeStopwords(tokens, stopwords).map((word: string) => {
        return word.toLowerCase();
    });

    cleanTokens.forEach((word: string) => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    // Sort terms by frequency and get top 3
    const mostCommon = Object.entries(frequencyMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([word, total]) => ({ word, total }));

    return mostCommon;
}

export const nlp = {
    getMostCommon
};

// // Function to process the article and count word frequencies
// async function getMostCommon(article: string, lang: string) {
//     const tokenizer = new WordTokenizer();
//     const tokens = tokenizer.tokenize(article);

//     // Remove stopwords and filter unique words while counting occurrences
//     const stopwords = langs[lang] || langs['en'];
//     const frequencyMap: Record<string, number> = {};

//     // Lemmatize tokens
//     const lemmatizedTokens = await lemmatizeWords(removeStopwords(tokens, stopwords));

//     lemmatizedTokens.forEach((word: string) => {
//         frequencyMap[word] = (frequencyMap[word] || 0) + 1;
//     });

//     // Sort terms by frequency and get top 3
//     const mostCommon = Object.entries(frequencyMap)
//         .sort(([, a], [, b]) => b - a)
//         .slice(0, 3)
//         .map(([word, total]) => ({ word, total }));

//     return mostCommon;
// }

// export const nlp = {
//     getMostCommon
// };

// import { WordTokenizer } from 'natural';
// import { removeStopwords, eng, por } from 'stopword';
// import natural from 'natural';

// const langs = { 'en': eng, 'pt': por };

// // Function to process the article and count word frequencies using stemming
// function getMostCommon(article: string, lang: string) {
//     const tokenizer = new WordTokenizer();
//     const tokens = tokenizer.tokenize(article);

//     // Remove stopwords and filter unique words while counting occurrences
//     const stopwords = langs[lang] || langs['en'];
//     const frequencyMap: Record<string, number> = {};

//     // Stem tokens after removing stopwords
//     const stemmedTokens = removeStopwords(tokens, stopwords).map((word: string) => {
//         return natural.PorterStemmer.stem(word); // Use Porter Stemmer for stemming
//     });

//     stemmedTokens.forEach((word: string) => {
//         frequencyMap[word] = (frequencyMap[word] || 0) + 1;
//     });

//     // Sort terms by frequency and get top 3
//     const mostCommon = Object.entries(frequencyMap)
//         .sort(([, a], [, b]) => b - a)
//         .slice(0, 3)
//         .map(([word, total]) => ({ word, total }));

//     return mostCommon;
// }

// export const nlp = {
//     getMostCommon
// };
