import { useDispatch } from "react-redux";
import { useSelectorDirection } from "../Redux/store"
import { ReactNode, useEffect } from "react";
import { countActions } from "../Redux/Slices/livesCountSlice";
import LifeGame from "./LifeGame";
import example from "../Config/example.json"
import config from "../Config/config.json"
import { getRandomMatrix } from "../utils/numbers";

const Lifes: React.FC<{countMatrix:number}> = ({countMatrix}) => {
    const randomMatrix = getRandomMatrix(config.matrix.width,config.matrix.heigth, 0, 2);
    let lifesGame: ReactNode[] = [];

    for (let index = 0; index < countMatrix; index++) {
        lifesGame.push(<LifeGame matrixStart={randomMatrix}></LifeGame>)
    }

    const dispath = useDispatch()
    useEffect(() => {
        dispath(countActions.setCount(4))
    },[])
    const flexDirection = useSelectorDirection();
    return <section style={{display: 'flex', flexDirection:flexDirection, alignItems:'center', justifyContent: 'space-around', height:'100vh'}}>
                {lifesGame.map(el => el)}
           </section>
}


export default Lifes;