import React, { useState } from 'react';
import Questionnaire from './Questionnaire';
import Results from './Results';

const PsychometricAssessment = () => {
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleQuestionnaireSubmit = (submittedAnswers) => {
    setAnswers(submittedAnswers);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setAnswers([]);
    setIsCompleted(false);
  };

  return (
    <div className="psychometric-assessment">
      {!isCompleted ? (
        <Questionnaire onSubmit={handleQuestionnaireSubmit} />
      ) : (
        <Results answers={answers} onReset={handleReset} />
      )}
    </div>
  );
};

export default PsychometricAssessment;