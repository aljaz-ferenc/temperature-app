import { useState, useMemo, useEffect, useCallback } from "react";
import { getAllTemps, getTempsByDateRange } from "./firebase/firebase";
import "./App.css";
import Statistics from "./components/Statistics";
import SubmitForm from "./components/SubmitForm";

function App() {
  const [data, setData] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null);
  const [filter, setFilter] = useState({ startDate: null, endDate: null });
  const [error, setError] = useState(null);
  const throttleTime = 3000;

  //fetch on app render
  useMemo(() => {
    getAllData();
    setLastRequestTime(currentTime());
  }, []);

  //filter button click
  useEffect(() => {
    if (filter.startDate && filter.endDate && checkThrottleTime()) {
      getFilteredData();
      setLastRequestTime(currentTime());
    } else if (checkThrottleTime()) {
      getAllData();
      setLastRequestTime(currentTime());
    }
  }, [filter]);


  //submit button click
  function handleAddData() {
    if (filter.startDate && filter.endDate) {
      getFilteredData();
    } else {
      getAllData();
    }
  }

  function getAllData() {
    getAllTemps()
    .then((data) => {setData(data)})
    .catch((error) => setError(error.message))
  }
  
  function getFilteredData() {
    getTempsByDateRange(filter.startDate, filter.endDate)
      .then((data) => setData(data))
      .catch((error) => setError(error.message));
  }

  function currentTime() {
    return new Date().getTime();
  }

  function checkThrottleTime() {
    return new Date().getTime() > lastRequestTime + throttleTime;
  }

  return (
    <div className="app">
      <Statistics
        data={data}
        filter={filter}
        getFilteredData={getFilteredData}
        setFilter={setFilter}
        error={error}
      />
      <SubmitForm handleAddData={handleAddData} />
    </div>
  );
}

export default App;
