import { useEffect, useRef, useState } from "react"
import LifeMatrix from "../services/LifeMatrix_Yuri"
import Matrix from "./Matrix"
import config from "../Config/config.json";

const LifeGame: React.FC<{matrixStart:number[][]}> = ({matrixStart}) => {
    
    const lifeMatrix = useRef<LifeMatrix>();
    const [numbers, setNumbers] = useState<number[][]>([])
            
    const MyMatrix:number[][] = matrixStart;

    function tickFn():void{
        if(!lifeMatrix.current){
            lifeMatrix.current = new LifeMatrix(MyMatrix);
            setNumbers(lifeMatrix.current.numbers);
        } else {
            setNumbers(lifeMatrix.current.next())
        }       
    }

    useEffect(() => {
        const intervalId = setInterval(tickFn,config.tick);
        return () => clearInterval(intervalId)
    })

    return <div>
        <Matrix matrix={numbers}></Matrix>
    </div>
}
export default LifeGame;