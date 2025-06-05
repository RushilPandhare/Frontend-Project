import React, { useEffect, useRef } from 'react';
import { createChart, LineStyle } from 'lightweight-charts';

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: '#ccc' },
      timeScale: { borderColor: '#ccc' },
    });

    const lineSeries = chart.addSeries('Line', {
      color: 'blue',
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
    });

    lineSeries.setData([
      { time: '2023-05-01', value: 40 },
      { time: '2023-05-02', value: 42 },
      { time: '2023-05-03', value: 39 },
      { time: '2023-05-04', value: 44 },
      { time: '2023-05-05', value: 45 },
    ]);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ width: '100%', height: '300px', marginTop: '20px' }}
    />
  );
}
