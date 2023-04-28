import { useState, useMemo} from 'react'
import './App.css'
import { getAllTemps } from "./firebase/firebase";


function App() {
  const [data, setData] = useState(null);
  const [lastRequestTime, setLastRequestTime] = useState(null)

  //fetch on app render
  useMemo(() => {
    getAllData()
    setLastRequestTime(currentTime())
  }, []);

  function getAllData(){
    getAllTemps().then((data) => setData(data));
  }

  function currentTime(){
    return new Date().getTime()
  }

  return (
    <div className='app'></div>
  )
}

export default App
