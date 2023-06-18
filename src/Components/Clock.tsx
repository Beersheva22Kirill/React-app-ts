import { CSSProperties} from "react";
import timeZones from '../Services/time-zones';
type Props = {
    time: Date,
    cityCountry: string
};
const style: CSSProperties = {display: "flex",
     flexDirection: "column", alignItems: 'center'};
function getTimeZone(cityCountry: string): string|undefined {
    const timeZoneObj =
     timeZones.find(tz => JSON.stringify(tz).includes(cityCountry));
     return timeZoneObj?.name;
}
export const Clock: React.FC<Props> = ({time, cityCountry}) => {
    const timeZone: string|undefined = getTimeZone(cityCountry);
    const title: string = (timeZone && cityCountry) || 'Israel';
    const timeStr: string = time.toLocaleTimeString(undefined,
     {timeZone}) 
     
    
    

    return <div style={style}>
            <header>
                Time in {title}
            </header>
            <p>{timeStr}</p>
    </div>
}