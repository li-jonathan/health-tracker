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
    <main className='p-4 md:px-40 md:pb-40'>
      {userData ? (
        <>
          <RangePicker selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
          <Line 
            data={{
              labels: userData.steps.filter(entry => {
                const [month, , year] = entry.date.split("/");
                return (month === selectedMonth || selectedMonth === "") && (year === selectedYear || selectedYear === "")
              }).map(entry => entry.date),
              datasets: [{
                label: "steps",
                data: userData.steps.filter(entry => {
                  const [month, , year] = entry.date.split("/");
                  return (month === selectedMonth || selectedMonth === "") && (year === selectedYear || selectedYear === "")
                }).map(entry => entry.steps),
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