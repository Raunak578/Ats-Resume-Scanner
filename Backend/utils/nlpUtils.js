const natural = require("natural");
const sw = require("stopword");

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function preprocess(text) {
  let tokens = tokenizer.tokenize(text.toLowerCase());
  tokens = sw.removeStopwords(tokens);
  tokens = tokens.map(word => stemmer.stem(word));
  return tokens.join(" ");
}

function cosineSimilarity(vec1, vec2) {
  let dot = 0.0;
  let normA = 0.0;
  let normB = 0.0;

  for (let i = 0; i < vec1.length; i++) {
    dot += vec1[i] * vec2[i];
    normA += vec1[i] * vec1[i];
    normB += vec2[i] * vec2[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  
  if(normA === 0 || normB === 0){
    return 0;
  }

  return dot / (normA * normB);
}

function calculateSimilarity(resumeText, jobDescription) {
  const tfidf = new natural.TfIdf();

  const processedResume = preprocess(resumeText);
  const processedJD = preprocess(jobDescription);

  tfidf.addDocument(processedResume);
  tfidf.addDocument(processedJD);

  const allTerms = new Set();

  tfidf.listTerms(0).forEach(item => allTerms.add(item.term));
  tfidf.listTerms(1).forEach(item => allTerms.add(item.term));

  const termsArray = Array.from(allTerms);

  const vector1 = [];
  const vector2 = [];

  termsArray.forEach(term => {
    vector1.push(tfidf.tfidf(term, 0));
    vector2.push(tfidf.tfidf(term, 1));
  });

  const similarity = cosineSimilarity(vector1, vector2);

  return similarity;
}

module.exports = { calculateSimilarity };