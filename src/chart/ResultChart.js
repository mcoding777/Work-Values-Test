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

export function ResultChart() {
  
  // 가치별 인덱스
  const valueIndex = {
    0: "능력발휘", 
    1: "자율성", 
    2: "보수", 
    3: "안정성", 
    4: "사회적인정", 
    5: "사회봉사", 
    6: "자기계발", 
    7: "창의성"
  };

  const value = JSON.parse(sessionStorage.getItem('result'));

    const data = {
      labels: Object.values(valueIndex),
      datasets: [
        {
          label: '검사 점수',
          backgroundColor: '#ec5990',
          data: Object.values(value),
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