import { CSSProperties, useEffect, useMemo, useState} from "react";
import timeZones from '../../Services/time-zones';
import Input from "../common/Input";
import InputResult from "../../Model/InputResult";

type Props = {
    time: Date,
    cityCountry: string
};
const style: CSSProperties = {display: "flex",
     flexDirection: "column", alignItems: 'center'};

const timeZoneDefault = 'Asia/Jerusalem';
const countryDefault = 'Israel'

function getTimeZone(cityCountry: string){
    const timeZoneArr =
     timeZones.filter(tz => JSON.stringify(tz).includes(cityCountry));
     return timeZoneArr;
}


export const Clock: React.FC<Props> = ({time, cityCountry}) => {

   
    const timeZoneStart: string|undefined = useMemo(() => getTimeZone(cityCountry)[0].name,[cityCountry]);
    const [currentZone,setCurrentZone] = useState(timeZoneStart);
    const [title, setTitle] = useState(cityCountry)
    const [timeStr, setTimeStr] = useState(time.toLocaleTimeString(undefined, {timeZone:timeZoneStart}))
 
    useEffect(() => {
        setTimeStr(time.toLocaleTimeString(undefined, {timeZone:currentZone}))
    },[time])

    function setTimeZone(inputText: string): InputResult {
        let res:InputResult = {status:"error", message:['Country or city not found']};
        const timeZones = getTimeZone(inputText);
        
        if(timeZones.length > 0) {

            res = timeZones.length != 1 ? {status:"warning",message:timeZones.map(el => `zone:${el.name}`)} 
                : {status:"success", message:[`Time of clock changed`]}

            setCurrentZone(timeZones[0].name);
            setTitle ((timeZones && inputText) || 'Israel');
            setTimeStr (time.toLocaleTimeString(undefined, {timeZone:timeZones[0].name})); 
        }
            
    return res;
    }
    
    
    

    return <div style={style}>
            <header>
                Time in {title}
            </header>
            <p>{timeStr}</p>
            <Input submitFn={setTimeZone} placeHolder={"Enter country/city"} buttonTitle="Ok"></Input>
    </div>
}