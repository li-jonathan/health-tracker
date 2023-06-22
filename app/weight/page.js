"use client"

import { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

import { useUserData } from '@/lib';
import { RangePicker } from '@/components';

export default function Page() {
  const userData = useUserData();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  return (
    <main className='px-40 pb-40'>
      {userData ? (
        <>
          <RangePicker selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
          <Line 
            data={{
              labels: userData.weight.filter(entry => {
                const [month, , year] = entry.date.split("/");
                return (month === selectedMonth || selectedMonth === "") && (year === selectedYear || selectedYear === "")
              }).map(entry => entry.date),
              datasets: [{
                label: "pounds",
                data: userData.weight.filter(entry => {
                  const [month, , year] = entry.date.split("/");
                  return (month === selectedMonth || selectedMonth === "") && (year === selectedYear || selectedYear === "")
                }).map(entry => entry.weight),
                borderColor: 'rgb(16,185,129)',
              }]
            }} 
          />
        </>
      ) : (
        <p>loading...</p>
      )}
    </main>
  )
}

function analyzeWeightData(data) {
  const result = data.reduce(
    (accumulator, entry) => {
      const weight = entry.weight;

      if (weight > accumulator.highestWeight.weight) {
        accumulator.highestWeight = entry;
      }

      if (weight < accumulator.lowestWeight.weight) {
        accumulator.lowestWeight = entry;
      }

      accumulator.totalWeight += weight;

      return accumulator;
    },
    {
      highestWeight: { date: null, weight: -Infinity },
      lowestWeight: { date: null, weight: Infinity },
      totalWeight: 0,
    }
  );

  const numEntries = data.length;
  result.averageWeight = result.totalWeight / numEntries;

  return result;
}
