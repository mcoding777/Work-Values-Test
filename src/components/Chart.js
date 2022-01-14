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

export function BarChart({values}) {

    const data = {
      labels: Object.keys(values),
      datasets: [
        {
          label: '검사 점수',
          backgroundColor: '#23324d',
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
        <BarChartDiv>
            <Bar data={data} options={options} />
        </BarChartDiv>
    )
  }

  // styled-components
  const BarChartDiv = styled.div`
    width: 800px;

    padding: 50px;

    background-color: white;
  `;