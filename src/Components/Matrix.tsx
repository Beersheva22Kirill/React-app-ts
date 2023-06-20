import { ReactNode } from "react"
import Row from "./Row"



const Matrix: React.FC<{matrix:number[][]}> = ({matrix}) => {
    
    function getRows(): ReactNode {
        return matrix.map((row,index) => <Row row = {row} key = {index}></Row>)
    }
    
    return <section style={{display:"flex", flexDirection:"column"}}>
                {getRows()}
    </section>
}

export default Matrix;