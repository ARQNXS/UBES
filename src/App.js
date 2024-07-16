import React, { useState } from 'react';
import './App.css';
import Questionnaire from './components/Questionnaire';
import Results from './components/Result';
import logo from './components/logos/logo.png';

const App = () => {
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleQuestionnaireSubmit = (submittedAnswers) => {
    setAnswers(submittedAnswers);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="ARQNXS Logo" className="app-logo" />
      </header>
      <main className="app-main">
        {!showResults ? (
          <Questionnaire onSubmit={handleQuestionnaireSubmit} />
        ) : (
          <>
            <Results answers={answers} onReset={handleReset} />
          </>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 Bevlogenheid Assessment App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;