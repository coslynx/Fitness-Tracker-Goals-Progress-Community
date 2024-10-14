'use client'

import React from 'react';
import { ProgressChartProps } from '@/types/progress';
import { Goal } from '@/core/domain/entities/goal/Goal';
import { Chart, CategoryScale, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
);

interface ProgressChartProps {
  goal: Goal;
  progressData: any[]; // Assuming progressData is an array of objects with date and progress values
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goal, progressData }) => {
  // 1. Prepare data for Chart.js
  const chartData = {
    labels: progressData.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: `${goal.type} Progress`,
        data: progressData.map((entry) => entry.value),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  // 2. Chart options for customization
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `${goal.type} Progress`,
      },
    },
  };

  // 3. Render the chart
  return (
    <div className="p-4 rounded-md shadow-md bg-white">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ProgressChart;