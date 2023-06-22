import React from 'react'

export const RangePicker = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  monthRange = [],
  yearRange
}) => {
  return (
    <div className='w-full flex justify-end gap-5'>
      <select
        value={selectedMonth}
        onChange={e => setSelectedMonth(e.target.value)}
        className='appearance-none rounded-md py-2 px-4 text-neutral-700 font-bold'
      >
        <option value="">All Months</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <select
        value={selectedYear}
        onChange={e => setSelectedYear(e.target.value)}
        className='appearance-none rounded-md py-2 px-4 text-neutral-700 font-bold'
      >
        <option value="">All Years</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
  )
}
