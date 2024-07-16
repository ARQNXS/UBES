import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Results.css';
import PsychometricVisualizer from './PsychometricVisualizer';
import logo from './logos/logo.png';

const Results = ({ answers, onReset }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Calculate total scores for each dimension
  const calculateTotal = (dimension) => {
    return answers.reduce((total, answer) => total + answer[dimension], 0);
  };

  const vitalityTotal = calculateTotal('vitality');
  const dedicationTotal = calculateTotal('dedication');
  const absorptionTotal = calculateTotal('absorption');

  // Calculate average scores
  const calculateAverage = (total) => {
    return total / (answers.length || 1); // Avoid division by zero
  };

  const vitalityAverage = calculateAverage(vitalityTotal);
  const dedicationAverage = calculateAverage(dedicationTotal);
  const absorptionAverage = calculateAverage(absorptionTotal);

  // Define norms and categories based on UBES guidelines
  const norms = {
    vitality: {
      'Zeer laag': { lowerBound: 0, upperBound: 2 },
      'Laag': { lowerBound: 2.01, upperBound: 3.25 },
      'Gemiddeld': { lowerBound: 3.26, upperBound: 4.8 },
      'Hoog': { lowerBound: 4.81, upperBound: 5.65 },
      'Zeer hoog': { lowerBound: 5.66, upperBound: 6 },
    },
    dedication: {
      'Zeer laag': { lowerBound: 0, upperBound: 1.33 },
      'Laag': { lowerBound: 1.34, upperBound: 2.9 },
      'Gemiddeld': { lowerBound: 2.91, upperBound: 4.7 },
      'Hoog': { lowerBound: 4.71, upperBound: 5.69 },
      'Zeer hoog': { lowerBound: 5.7, upperBound: 6 },
    },
    absorption: {
      'Zeer laag': { lowerBound: 0, upperBound: 1.17 },
      'Laag': { lowerBound: 1.18, upperBound: 2.33 },
      'Gemiddeld': { lowerBound: 2.34, upperBound: 4.2 },
      'Hoog': { lowerBound: 4.21, upperBound: 5.33 },
      'Zeer hoog': { lowerBound: 5.34, upperBound: 6 },
    },
  };

  // Function to get category based on score and norms
  const getCategory = (score, dimension) => {
    const categories = Object.keys(norms[dimension]);
    for (let category of categories) {
      const { lowerBound, upperBound } = norms[dimension][category];
      if (score >= lowerBound && score <= upperBound) {
        return category;
      }
    }
    return 'Ongedefinieerd';
  };

  // Determine categories for each dimension
  const vitalityCategory = getCategory(vitalityAverage, 'vitality');
  const dedicationCategory = getCategory(dedicationAverage, 'dedication');
  const absorptionCategory = getCategory(absorptionAverage, 'absorption');

  // Function to render advice based on category
  const renderAdvice = (category) => {
    switch (category) {
      case 'Zeer hoog':
        return "U scoort zeer hoog op bevlogenheid en toewijding. Dit geeft aan dat u over het algemeen zeer betrokken en energiek bent in uw werk. Het is belangrijk om deze positieve energie te behouden door regelmatig uw werk te evalueren en uitdagingen te blijven zoeken.";
      case 'Hoog':
        return "U scoort hoog op bevlogenheid en toewijding. Dit betekent dat u over het algemeen betrokken en energiek bent in uw werk. Blijf uw motivatie voeden door te streven naar nieuwe doelen en uitdagingen.";
      case 'Gemiddeld':
        return "U scoort gemiddeld op bevlogenheid en toewijding. Er is ruimte om meer betrokkenheid en energie te ervaren in uw werk. Overweeg manieren om meer voldoening en uitdaging te vinden in uw dagelijkse taken.";
      case 'Laag':
        return "U scoort laag op bevlogenheid en toewijding. Het is belangrijk om te kijken naar wat u kunt veranderen of verbeteren om meer betrokkenheid en energie te ervaren in uw werk. Zoek naar taken die u meer voldoening geven en stel duidelijke doelen voor uzelf.";
      case 'Zeer laag':
        return "U scoort zeer laag op bevlogenheid en toewijding. Dit kan duiden op een gebrek aan motivatie en betrokkenheid in uw werk. Het is essentieel om te achterhalen wat u mist en hoe u meer voldoening kunt halen uit uw werk.";
      default:
        return "Geen specifiek advies beschikbaar. Raadpleeg een professional voor persoonlijke begeleiding.";
    }
  };

  return (
    <div className="result-container">
      <div ref={componentRef}>
        <div className="header">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <h2>Psychometrische Resultaten</h2>
        </div>
        <PsychometricVisualizer
          vitalityTotal={vitalityTotal}
          dedicationTotal={dedicationTotal}
          absorptionTotal={absorptionTotal}
        />
        <div className="result-item">
          <h3>Vitaliteit</h3>
          <p>Gemiddelde Score: {vitalityAverage.toFixed(2)}</p>
          <p>Categorie: {vitalityCategory}</p>
          <p>Advies: {renderAdvice(vitalityCategory)}</p>
        </div>
        <div className="result-item">
          <h3>Toewijding</h3>
          <p>Gemiddelde Score: {dedicationAverage.toFixed(2)}</p>
          <p>Categorie: {dedicationCategory}</p>
          <p>Advies: {renderAdvice(dedicationCategory)}</p>
        </div>
        <div className="result-item">
          <h3>Absorptie</h3>
          <p>Gemiddelde Score: {absorptionAverage.toFixed(2)}</p>
          <p>Categorie: {absorptionCategory}</p>
          <p>Advies: {renderAdvice(absorptionCategory)}</p>
        </div>
        <div className="attribution">
          <p>Deze beoordeling is gebaseerd op de Utrecht Work Engagement Scale (UWES).</p>
          <p>Voor meer informatie, zie:</p>
          <p>Schaufeli, W.B., & Bakker, A.B. (2003). UWES – Utrecht Work Engagement Scale: Test Manual.</p>
          <p>Utrecht University, Department of Psychology</p>
        </div>
      </div>
      <div className="button-container">
        <button className="print-button" onClick={handlePrint}>
          Resultaten Afdrukken / PDF
        </button>
        <button className="reset-button" onClick={onReset}>
          Opnieuw beginnen
        </button>
      </div>
    </div>
  );
};

export default Results;