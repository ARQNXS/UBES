import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PsychometricVisualizer = ({ vitalityTotal, dedicationTotal, absorptionTotal }) => {
  // Data for the pie chart
  const data = {
    labels: ['Vitality', 'Dedication', 'Absorption'],
    datasets: [
      {
        data: [vitalityTotal, dedicationTotal, absorptionTotal],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Options for the pie chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="psychometric-visualizer">
  
      <div className="chart-container" style={{ height: '300px', width: '300px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PsychometricVisualizer;