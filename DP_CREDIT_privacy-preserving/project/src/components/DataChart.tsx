import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataChartProps {
  title: string;
  data: number[];
}

export function DataChart({ title, data }: DataChartProps) {
  const labels = Array.from({ length: data.length }, (_, i) => `${i * 10}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: 'rgba(96, 165, 250, 0.5)',
        borderColor: 'rgb(96, 165, 250)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: title,
        color: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return <Bar options={options} data={chartData} />;
}