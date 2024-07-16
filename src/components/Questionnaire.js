import React, { useState } from 'react';
import './Questionnaire.css';

const Questionnaire = ({ onSubmit }) => {
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    { code: 'VIT01', statement: 'Op mijn werk bruis ik van energie.' },
    { code: 'TOE01', statement: 'Ik vind het werk dat ik doe nuttig en zinvol.' },
    { code: 'ABS01', statement: 'Als ik aan het werk ben, dan vliegt de tijd voorbij.' },
    { code: 'VIT02', statement: 'Als ik werk voel ik me fit en sterk.' },
    { code: 'TOE02', statement: 'Ik ben enthousiast over mijn baan.' },
    { code: 'ABS02', statement: 'Als ik werk vergeet ik alle andere dingen om me heen.' },
    { code: 'TOE03', statement: 'Mijn werk inspireert mij.' },
    { code: 'VIT03', statement: 'Als ik s morgens opsta heb ik zin om aan het werk te gaan.' },
    { code: 'ABS03', statement: 'Wanneer ik heel intensief aan het werk ben, voel ik mij gelukkig.' },
    { code: 'TOE04', statement: 'Ik ben trots op het werk dat ik doe.' },
    { code: 'ABS04', statement: 'Ik ga helemaal op in mijn werk.' },
    { code: 'VIT04', statement: 'Als ik aan het werk ben, dan kan ik heel lang doorgaan.' },
    { code: 'TOE05', statement: 'Mijn werk is voor mij een uitdaging.' },
    { code: 'ABS05', statement: 'Mijn werk brengt mij in vervoering.' },
    { code: 'VIT05', statement: 'Op mijn werk beschik ik over een grote mentale veerkracht.' },
    { code: 'ABS06', statement: 'Ik kan me moeilijk van mijn werk losmaken.' },
    { code: 'VIT06', statement: 'Op mijn werk zet ik altijd door, ook als het tegenzit.' },
  ];

  const handleSliderChange = (code, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [code]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestionIndex === questions.length - 1) {
      const formattedAnswers = questions.map(question => ({
        vitality: ['VIT01', 'VIT02', 'VIT03', 'VIT04', 'VIT05', 'VIT06'].includes(question.code) ? responses[question.code] || 0 : 0,
        dedication: ['TOE01', 'TOE02', 'TOE03', 'TOE04', 'TOE05'].includes(question.code) ? responses[question.code] || 0 : 0,
        absorption: ['ABS01', 'ABS02', 'ABS03', 'ABS04', 'ABS05', 'ABS06'].includes(question.code) ? responses[question.code] || 0 : 0
      }));
      onSubmit(formattedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderQuestion = (question, index) => {
    return (
      <div className={`question-container fade-in`} key={index}>
        <p className="question-number">{index + 1}.</p>
        <p className="question-statement">{question.statement}</p>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="6"
            value={responses[question.code] || 0}
            onChange={(e) => handleSliderChange(question.code, e.target.value)}
            step="1"
          />
          <div className="slider-labels">
            <span>0 - Nooit</span>
            <span>1 - Een paar keer per jaar of minder</span>
            <span>2 - Af en toe, een paar keer per maand</span>
            <span>3 - Regelmatig, eens per maand of keer per week</span>
            <span>4 - Dikwijls, een paar keer per week</span>
            <span>5 - Zeer dikwijls, eens per week</span>
            <span>6 - Altijd, dagelijks</span>
          </div>
        </div>
        <div className="navigation-buttons">
          {index > 0 && <button type="button" onClick={() => setCurrentQuestionIndex(index - 1)}>Vorige</button>}
          {index < questions.length - 1 ? (
            <button type="button" onClick={() => setCurrentQuestionIndex(index + 1)}>Volgende</button>
          ) : (
            <button type="submit">Indienen</button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="questionnaire-container">
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        {renderQuestion(questions[currentQuestionIndex], currentQuestionIndex)}
      </form>
    </div>
  );
};

export default Questionnaire;