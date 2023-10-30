import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { getPriceHistory } from '../../api/product';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);
import styled from 'styled-components';
import { PriceData, ChartData, PriceChartProps, PriceWrapProps, FormattedData } from '../../type/type';

// 최고가, 최저가
export const PriceDataWrap: React.FC<PriceWrapProps> = ({ minPrice, maxPrice }) => {
  // 문자열로 변환 후 천 단위 쉼표 기재
  const semicolonMinPrice = minPrice !== undefined ? minPrice.toLocaleString() : '0';
  const semicolonMaxPrice = maxPrice !== undefined ? maxPrice.toLocaleString() : '0';

  return (
    <PriceWrap>
      <PriceArea>
        <Text>최저가</Text>
        <LowestPrice>{semicolonMinPrice}원</LowestPrice>
      </PriceArea>
      <PriceArea>
        <Text>최고가</Text>
        <HighestPrice>{semicolonMaxPrice}원</HighestPrice>
      </PriceArea>
    </PriceWrap>
  );
};

// 차트
export const PriceChart: React.FC<PriceChartProps> = ({ id, setMinPrice, setMaxPrice }) => {
  const { isLoading, isError, data } = useQuery<PriceData | undefined>('priceHistory', () => getPriceHistory(id));
  const [priceData, setPriceData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [_, setFormattedData] = useState<FormattedData>({});

  // 날짜 형식 변경 (년월일 -> 월일)
  const DeleteYear = (date: string) => {
    const dateData = new Date(date);
    return `${dateData.getMonth() + 1}/${dateData.getDate()}`;
  };

  useEffect(() => {
    if (data?.priceHistoryForWeek) {
      const newFormattedData: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(data.priceHistoryForWeek)) {
        const newKey = DeleteYear(key);
        newFormattedData[newKey] = value;
      }
      setFormattedData(newFormattedData);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createLinearGradient(0, 0, 0, 180);
      gradient.addColorStop(0, 'rgba(0, 171, 249, 0.12)');
      gradient.addColorStop(1, 'rgba(0, 171, 249, 0)');

      const labels = Object.keys(newFormattedData);
      const datasetData = Object.values(newFormattedData) as number[];

      setPriceData({
        labels: labels,
        datasets: [
          {
            label: '',
            data: datasetData,
            borderColor: '#00ABF9',
            borderWidth: 2,
            fill: true,
            backgroundColor: gradient,
          },
        ],
      });

      setMinPrice(data?.minPrice);
      setMaxPrice(data?.maxPrice);
    }
  }, [data, setMinPrice, setMaxPrice]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }

  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return <Line data={priceData} options={options} />;
};

const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriceArea = styled.div`
  width: 335px;
  height: 46px;
  border: 1px solid #b5b5b5;
  border-radius: 10px;
  display: flex;
  flex: shrink;
  align-items: center;
  margin-bottom: 5px;
  padding-left: 18px;
`;

const Text = styled.div`
  margin-left: 14px;
`;

const LowestPrice = styled.div`
  color: #458fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 85px;
`;

const HighestPrice = styled.div`
  color: #ff4545;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 121.5%;
  margin-left: 85px;
`;
