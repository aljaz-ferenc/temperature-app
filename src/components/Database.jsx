import React, { useEffect, useState } from "react";
import "./Database.css";

export default function Database({ completeData }) {
  const [displayedData, setDisplayedData] = useState([])
  const [dateFilterReversed, setDateFilterReversed] = useState(false)
  const [locationFilterReversed, setLocationFilterReversed] = useState(false)
  const [tempFilterReversed, setTempFilterReversed] = useState(false)


  useEffect(() => {
    console.log(completeData)
    setDisplayedData(completeData)
  }, [completeData])

  function handleFilterByTemp(){
    setTempFilterReversed(!tempFilterReversed)
    const sortedData = [...displayedData].sort((a, b) => {
     return a.temperature > b.temperature ? 1 : -1
    })
    if(tempFilterReversed){
      sortedData.reverse()
    }
    setDisplayedData(sortedData)
  }

  function handleFilterByLocation(){
    setLocationFilterReversed(!locationFilterReversed)
    const sortedData = [...displayedData].sort((a, b) => {
      return a.location > b.location ? 1 : -1
     })
     if(locationFilterReversed){
      sortedData.reverse()
    }
     setDisplayedData(sortedData)
  }

  function handleFilterByDate(){
    setDateFilterReversed(!dateFilterReversed)
    const sortedData = [...displayedData].sort((a, b) => {
      return a.date > b.date ? 1 : -1
    })
    if(dateFilterReversed){
      sortedData.reverse()
    }
     setDisplayedData(sortedData)
  }

  return (
    <>
      <h3 style={{ marginTop: "3rem" }}>Database</h3>
      <div className="database">
        <table>
          <thead>
            <tr>
              <th onClick={handleFilterByTemp}>Temperature</th>
              <th onClick={handleFilterByLocation}>Location</th>
              <th onClick={handleFilterByDate}>Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedData &&
              displayedData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.temperature}</td>
                  <td>{entry.location}</td>
                  <td>{new Date(entry.date).toLocaleDateString("slo-SI")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
