import { useEffect, useRef, useState } from "react"
import LifeMatrix from "../services/LifeMatrix_Yuri"
import Matrix from "./Matrix"
import { getRandomMatrix } from "../utils/numbers";
import config from "../Config/config.json";
import example from "../Config/example.json";

const {matrix,tick} = config;


const LifeGame: React.FC<{matrixStart:number[][]}> = ({matrixStart}) => {
    
    const lifeMatrix = useRef<LifeMatrix>();
    const [numbers, setNumbers] = useState<number[][]>([])
    
    const randomMatrix = getRandomMatrix(matrix.width,matrix.heigth, 0, 2);
        
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
        const intervalId = setInterval(tickFn,tick);
        return () => clearInterval(intervalId)
    },[])

    return <div>
        <Matrix matrix={numbers}></Matrix>
    </div>
}
export default LifeGame;