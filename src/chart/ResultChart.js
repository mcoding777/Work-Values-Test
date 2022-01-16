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
import styled from 'styled-components';

// 결과 테이블

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export function ResultChart({index, values}) {

    const data = {
      labels: Object.values(index),
      datasets: [
        {
          label: '검사 점수',
          backgroundColor: '#ec5990',
          data: Object.values(values),
        },
      ],
    };

    const options = {
        scales: {
            y: { // 좌표값
              max: 10,
            }
        },
        plugins: {
            legend: { // 범례 스타일링
              labels: {
                  position: "right",
              }
            }
        }
    };
  
    return (
        <ResultChartDiv>
            <Bar data={data} options={options} />
        </ResultChartDiv>
    )
  }

  // styled-components
  const ResultChartDiv = styled.div`
    width: 900px;

    padding: 50px;

    background-color: white;
  `;