import { CSSProperties, useEffect, useState } from "react"
import timeZones from "../Services/time-zones"

type Props = {
    countryOrCity: string
}
export const Clock: React.FC<Props> = ({countryOrCity}) => {
    const style: CSSProperties = {
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
    }
    let timezone:string = "Asia/Jerusalem";
    let country:string = `country: Israel`;

    const AllTimeZones = timeZones;
       AllTimeZones.forEach(stringOfZone => {

        if (stringOfZone.mainCities.includes(countryOrCity)){
                timezone = stringOfZone.name;
                country = `city: ${countryOrCity}`;
        } else if(stringOfZone.countryName.includes(countryOrCity)){
                timezone = stringOfZone.name;
                country = `country: ${countryOrCity}`;
        }             
    })

    const [time, setTime] = useState<string>(new Date().toLocaleTimeString(undefined,{timeZone:timezone}))

    useEffect(() => {
        const intervalId = setInterval(() => {
           setTime(new Date().toLocaleTimeString(undefined,{timeZone:timezone}));                      
        }, 1000 );
    return () => clearInterval(intervalId)
   }, [])
 
    return <div style={style}>
                <header>
                   {`Time in ${country}`}
                </header>
                <p>{time}</p>
           </div>
}