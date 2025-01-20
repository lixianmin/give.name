'use client';

import { useState } from "react";

interface NameSuggestion {
  name: string;
  pinyin: string;
  meanings: {
    individual: string[];
    combined: string;
  };
  cultural: string;
  personality: string;
  english: string;
}

interface GenerateResponse {
  choices: [{
    message: {
      content: string;
    }
  }]
}

export default function Home() {
  const [englishName, setEnglishName] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const [error, setError] = useState('');

  const generateNames = async () => {
    if (!englishName.trim()) {
      setError('Please enter an English name');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestions([]);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ englishName }),
      });

      const data: GenerateResponse = await response.json();
      
      // Parse the LLM response into structured data
      try {
        const parsedContent = JSON.parse(data.choices[0].message.content);
        setSuggestions(parsedContent);
      } catch (parseError) {
        setError('Failed to parse the generated names. Please try again.');
      }
    } catch (err) {
      setError('Failed to generate names. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      generateNames();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            English to Chinese Name Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generate meaningful Chinese names that match your English name
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your English name"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={generateNames}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Generating...' : 'Generate Names'}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {suggestion.name}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {suggestion.pinyin}
                      </p>
                    </div>
                    <span className="text-2xl text-gray-400 dark:text-gray-600">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Character Meanings
                    </h3>
                    <div className="space-y-1">
                      {suggestion.meanings.individual.map((meaning, i) => (
                        <p key={i} className="text-gray-800 dark:text-gray-200">
                          {meaning}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Combined Meaning
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {suggestion.meanings.combined}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Cultural Significance
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {suggestion.cultural}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Personality Traits
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {suggestion.personality}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      English Explanation
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      {suggestion.english}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
