import React, { useState } from "react";
import { addTemperature } from "../firebase/firebase";
import './SubmitForm.css'

export default function SubmitForm({handleAddData}) {
  const [temperature, setTemperature] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addTemperature(+temperature, location, date);
    setTemperature("");
    setLocation("");
    setDate("");
    handleAddData()
  }

  return (
    <form onSubmit={handleSubmit} className="submit" action="">
      <h3>Add data</h3>
      <div>
        <label htmlFor="temperature">Temperature: </label>
        <input
          value={temperature}
          required
          onChange={(e) => setTemperature(e.target.value)}
          id="temperature"
          type="number"
        />
      </div>
      <div>
        <label htmlFor="location">Location: </label>
        <input
          value={location}
          required
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text"
        />
      </div>
      <div>
        <label htmlFor="date">Date: </label>
        <input
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
          id="date"
          type="date"
        />
      </div>
      <button>Submit</button>
    </form>
  );
}
