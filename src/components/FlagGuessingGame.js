import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const FlagGuessingGame = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isGuessed, setIsGuessed] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(response => response.json())
      .then(data => {
        const formattedCountries = data.map(country => ({
          name: country.name.common,
          flag: country.flags.png
        }));
        setCountries(formattedCountries);
        startNewRound(formattedCountries);
      });
  }, []);

  const getRandomCountries = (count, allCountries) => {
    const shuffled = [...allCountries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const startNewRound = (allCountries) => {
    if (allCountries.length > 0) {
      const gameCountries = getRandomCountries(4, allCountries);
      setCurrentCountry(gameCountries[0]);
      setOptions(gameCountries.sort(() => 0.5 - Math.random()));
      setSelectedCountry(null);
      setIsGuessed(false);
    }
  };

  const handleGuess = (country) => {
    setSelectedCountry(country);
    setIsGuessed(true);
    if (country.name === currentCountry.name) {
      setScore(score + 1);
    }
    setTimeout(() => startNewRound(countries), 2000);
  };

  const getButtonColor = (country) => {
    if (!isGuessed) return 'bg-blue-600 hover:bg-blue-700';
    if (country.name === currentCountry.name) return 'bg-green-500';
    if (country === selectedCountry) return 'bg-red-500';
    return 'bg-blue-600 opacity-50';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Card className="w-96 bg-gray-800 border-gray-700 shadow-2xl">
        <CardContent className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-400">Guess the Flag</h1>
          <div className="text-center mb-10">
            {currentCountry && (
              <img 
                src={currentCountry.flag}
                alt={`Flag of ${currentCountry.name}`}
                className="w-full h-auto mx-auto"
              />
            )}
          </div>
          <div className="space-y-4">
            {options.map((country) => (
              <Button
                key={country.name}
                className={`w-full ${getButtonColor(country)} text-white transition-colors duration-200 py-3 rounded-lg text-lg font-semibold`}
                onClick={() => handleGuess(country)}
                disabled={isGuessed}
              >
                {country.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-3xl font-bold text-blue-400">Score: {score}</div>
    </div>
  );
};

export default FlagGuessingGame;