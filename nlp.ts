import { WordTokenizer } from 'natural';
import { removeStopwords, eng, por } from 'stopword';

const langs = { 'en': eng, 'pt': por };

// Function to process the article and count word frequencies
function countWordFrequencies(article: string, lang: string) {
    const tokenizer = new WordTokenizer();
    const tokens = tokenizer.tokenize(article);
    
    // Remove stopwords and filter unique words while counting occurrences
    const stopwords = langs[lang] || langs['en'];
    const frequencyMap: Record<string, number> = {};

    removeStopwords(tokens, stopwords).forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });

    // Sort terms by frequency and get top 3
    const mostCommon = Object.entries(frequencyMap)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 1)
        .map(([word, total]) => ({ word, total }));

    return mostCommon;
}

// Example usage
const article = "Heredity, also called inheritance or biological inheritance, is the passing on of traits from parents to their offspring; either through asexual reproduction or sexual reproduction, the offspring cells or organisms acquire the genetic information of their parents. Through heredity, variations between individuals can accumulate and cause species to evolve by natural selection. The study of heredity in biology is genetics.";
const commonWords = countWordFrequencies(article, 'en');
console.log(commonWords);
