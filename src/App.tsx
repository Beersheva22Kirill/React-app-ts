import LifeGame from "./Components/LifeGame";
import example from "./Config/example.json";
import config from "./Config/config.json"
import { getRandomMatrix } from "./utils/numbers";

const App: React.FC = () => {
  const randomMatrix = getRandomMatrix(config.matrix.width,config.matrix.heigth, 0, 2);

  return  <div style={ {display:"flex",justifyContent:"center"}}> 
          <div style={{margin:'20px'}}>
                <LifeGame matrixStart={randomMatrix}></LifeGame>
            </div>             
            <div style={{margin:'20px'}}>
                <LifeGame matrixStart={example.gun}></LifeGame>
            </div> 
            <div style={{margin:'20px'}}>
                <LifeGame matrixStart={example.infinite}></LifeGame>
            </div>  
          </div>
}

export default App;

