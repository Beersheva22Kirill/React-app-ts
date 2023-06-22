import { useSelectorCount, useSelectorDirection } from "../Redux/store"
import { ReactNode} from "react";
import LifeGame from "./LifeGame";
import example from "../Config/example.json"
import config from "../Config/config.json"
import { getRandomMatrix } from "../utils/numbers";

const Lifes: React.FC = () => {
    const count = useSelectorCount()
    const randomMatrix = getRandomMatrix(config.matrix.width,config.matrix.heigth, 0, 2);
    let lifesGame: ReactNode[] = [];

    const flexDirection = useSelectorDirection();
    return <section style={{display: 'flex', flexDirection:flexDirection, alignItems:'center', justifyContent: 'space-around', height:'100vh'}}>
                {Array.from({length:count}).map(() => <LifeGame matrixStart={randomMatrix}></LifeGame>)}
           </section>
}


export default Lifes;