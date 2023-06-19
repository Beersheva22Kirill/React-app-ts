import { useState, useEffect, CSSProperties } from "react";
import ClocksConfig from "../../Config/clock-config.json"
import { Clock } from "./Clock"
import '../../App.css'


const Clocks:React.FC = () => {
    const style: CSSProperties = {
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: 'space-around'
        }
    const countryes = ClocksConfig.countries;

    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date());            
   }, 1000 );

   return () => clearInterval(intervalId)
   }, [])

    return <div>
            <div className="H1-class">My Clocks</div>
            <div style={style}>
                {countryes.map(country => <Clock time={time} cityCountry={country}></Clock>)}
           </div>
        </div>
    
}
export default Clocks