import { useEffect, useRef, useState } from "react"
import LifeMatrix from "../services/LifeMatrix"
import Matrix from "./Matrix"
import { getRandomMatrix } from "../utils/numbers";
import config from "../Config/config.json";

const {matrix,tick} = config;
const LifeGame: React.FC = () => {
    
    const lifeMatrix = useRef<LifeMatrix>();
    const [numbers, setNumbers] = useState<number[][]>([])
        //[[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0],[0,0,0,0,0]] test algoritm
    const MyMatrix:number[][] =  getRandomMatrix(matrix.width,matrix.heigth, 0, 2)

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