import { CSSProperties, ReactNode } from "react"


const Row:React.FC<{row:number[]}> = ({row}) => {
    
    function getDivs():ReactNode {
       
        return row.map((num,index) => 
                <div key={index} style={getStyle(num)}></div>)
    }

    function getStyle(num:number){
        const style:CSSProperties = {
            width:'10px',
            height:'10px',
            background: num ? 'black' : 'white',

        }
        return style; 
    }

    return <section style = {{display:"flex",justifyContent:"center"}}>
        {getDivs()}
    </section>
}

export default Row;