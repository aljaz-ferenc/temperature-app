import React, { useEffect, useState, useRef } from "react";
import "./Statistics.css";

export default function Statistics({ data, setFilter, error}) {
  const startDateRef = useRef();
  const endDateRef = useRef();
  const [average, setAverage] = useState(null);
  const [daysAboveAvg, setDaysAboveAvg] = useState(0);
  const [hotDays, setHotDays] = useState();
  const [coldDays, setColdDays] = useState();
  const [mode, setMode] = useState(null);
  const [dateRangeIsValid, setDateRangeIsValid] = useState()

  useEffect(() => {
    if (data) calcStats(data);
  }, [data]);

  function calcStats(data) {
    const temps = data.map((data) => data.temperature);
    const sum = temps.reduce((acc, temp) => acc + temp, 0);
    const average = sum / temps.length;
    const hotDays = temps.filter((temp) => temp > 15).length;
    const coldDays = temps.filter((temp) => temp < 15).length;
    const aboveAverage = temps.filter((temp) => temp > average).length;

    setAverage(average);
    setHotDays(hotDays);
    setColdDays(coldDays);
    setDaysAboveAvg(aboveAverage);
    findMode(temps);
  }

  function findMode(temps) {
    const frequencies = {};
    let highestCount = 0;
    let mostFrequentValue = -Infinity;

    temps.forEach((temp) => {
      if (frequencies[temp]) {
        frequencies[temp]++;
      } else {
        frequencies[temp] = 1;
      }
    });

    Object.entries(frequencies).forEach((entry) => {
      if (entry[1] > highestCount) {
        highestCount = +entry[1];
        mostFrequentValue = +entry[0];
      }
    });
    setMode(mostFrequentValue);
  }

  function handleFilter(e) {
    e.preventDefault();
    setFilter({
      startDate: new Date(startDateRef.current.value).getTime(),
      endDate: new Date(endDateRef.current.value).getTime(),
    });
  }

  return (
    <div className="statistics">
      <div className="filter">
        <form action="">
          <div>
            <label htmlFor="start-date">Start date: </label>
            <input id="start-date" type="date" required ref={startDateRef} />
          </div>
          <div>
            <label htmlFor="end-date">End date: </label>
            <input id="end-date" type="date" required ref={endDateRef} />
          </div>
          <button onClick={handleFilter}>Filter</button>
        </form>
      {data && data.length > 0 ? <div className="display">
        <h3>Statistics</h3>
        <p>
          Average temperature:{" "}
          <strong>{average && average.toFixed(1)}&#8451; </strong>
        </p>
        <p>
          Days above average: <strong>{daysAboveAvg}</strong>
        </p>
        <p>
          Number of hot days: <strong>{hotDays}</strong>
        </p>
        <p>
          Number of cold days: <strong>{coldDays}</strong>
        </p>
        <div>
          Mode: <strong>{mode}</strong>
        </div>
      </div> : <p>No data to display...</p>}
      {error && <p style={{color: 'red'}}>Something went wrong: {error}</p>}
      </div>
    </div>
  );
}
