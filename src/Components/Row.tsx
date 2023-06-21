import { CSSProperties, ReactNode, useEffect, useState } from "react"
import config from "../Config/config.json";

function getSize(){
    return Math.min(window.innerHeight, window.innerWidth) / (config.matrix.heigth + config.matrix.width) - 2
}

const Row:React.FC<{row:number[]}> = ({row}) => {
    const [size,setSize] = useState(getSize);
    useEffect(() => {
        window.addEventListener('resize', () => setSize(getSize()))
    },[size])

    
    function getDivs():ReactNode {

       

        return row.map((num,index) => 
                <div key={index} style={getStyle(num)}></div>)
    }

    function getStyle(num:number){
        const style:CSSProperties = {
            width:size,
            height:size,
            background: num ? 'black' : 'white',
            borderStyle: 'groove'

        }
        return style; 
    }

    return <section style = {{display:"flex",justifyContent:"center"}}>
        {getDivs()}
    </section>
}

export default Row;