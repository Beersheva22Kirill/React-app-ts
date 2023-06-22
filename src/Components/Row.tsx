import { CSSProperties, ReactNode } from "react"
import { useSelectorCount, useSelectorSize } from "../Redux/store";

const Row:React.FC<{row:number[]}> = ({row}) => {
    
    const size = useSelectorSize()
    const lifesCount = useSelectorCount() 

    function getDivs():ReactNode {

        return row.map((num,index) => 
                <div key={index} style={getStyle(num)}></div>)
    }

    function getStyle(num:number){
        const style:CSSProperties = {
            width:size/lifesCount,
            height:size/lifesCount,
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