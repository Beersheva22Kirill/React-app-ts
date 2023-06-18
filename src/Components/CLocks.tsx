import {useState } from "react";
import { Clock } from "./Clock"

const Clocks: React.FC = () => {
 
    //const [country,setCountry] = useState<string>("")

    return <div style={
        {display: 'flex', 
        flexDirection: "row",
        justifyContent:"space-around"
        }}> 
                <Clock countryOrCity={"undefined"}></Clock>
                <Clock countryOrCity={"Mexico"}></Clock>
                <Clock countryOrCity={"Antarctica"}></Clock>
                <Clock countryOrCity={"Minsk"}/>
    </div>
} 

export default Clocks