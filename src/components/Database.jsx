import React, { useState } from "react";
import "./Database.css";

export default function Database({ completeData }) {
  const [showDatabase, setShowDatabase] = useState(true);

  return (
    <>
      <h3 style={{ marginTop: "3rem" }}>Database</h3>
      <div className="database">
        <table>
          <thead>
            <tr>
              <th>Temperature</th>
              <th>Location</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {completeData &&
              completeData.map((entry) => (
                <tr>
                  <td>{entry.temperature}</td>
                  <td>{entry.location}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
