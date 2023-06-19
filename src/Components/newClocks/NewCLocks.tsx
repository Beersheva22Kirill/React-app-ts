import { useState, useEffect, CSSProperties } from "react";
import ClocksConfig from "../../Config/clock-config.json"
import { NewClock } from "./NewClock"
import '../../App.css'


const NewClocks:React.FC = () => {
    const style: CSSProperties = {
            display: 'flex',
            flexDirection: 'row', 
            justifyContent: 'space-around'
        }
    const countryes = ClocksConfig.countries;

    const [time, setTime] = useState<Date>(new Date())
    useEffect(() => {
        console.log('Mounting of clocks')
        const intervalId = setInterval(() => {
        setTime(new Date()); 
           
   }, 1000 );  
   return () => {
    console.log('Unmounting of NewClocks');
    clearInterval(intervalId)
   }
   
   }, [])

    return <div>
            <div className="H1-class">Clocks of Yuri</div>
            <div style={style}>
                {countryes.map(country => <NewClock time={time} cityCountry={country}></NewClock>)}
           </div>
        </div>
}
export default NewClocks