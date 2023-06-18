import { useState, useEffect } from "react";
import { Clock } from "./Clock"

const Clocks:React.FC = () => {
    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
       setTime(new Date());
      
   }, 1000 );
   return () => clearInterval(intervalId)
   }, [])
    return <div style={{display: 'flex',
     flexDirection: 'row', justifyContent: 'space-around'}}>
       <Clock time={time} cityCountry="London" />
       <Clock time={time} cityCountry="Toronto"/>
    </div>
}
export default Clocks