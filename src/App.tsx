import LifeGame from "./Components/LifeGame";
import example from "./Config/example.json";
import config from "./Config/config.json"
import { getRandomMatrix } from "./utils/numbers";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sizeAction } from "./Redux/Slices/cellSizeSlice";
import { directionActions } from "./Redux/Slices/flexDirectionSlice";
import Input from "./Components/common/Input";
import NewInputResult from "./Model/NewInputResult";
import Lifes from "./Components/Lifes";
import NewInput from "./Components/common/NewInput";
import InputResult from "./Model/InputResult";

let countLifes:number = 0;



const App: React.FC = () => {
  const [lifes, setlifes] = useState<ReactNode>()


  function submitCountLifes(value:string):InputResult {
    const count = Number.parseInt(value)
    let res:InputResult = {status:"success",
      message:[``]}
      if (count > 0 && count < 5) {
        countLifes = count;
        setlifes(<Lifes countMatrix={countLifes}></Lifes>); 
      } else {
        res = {status:"error",
        message:[`count lifes ${count} not correct (1 - 5)`]}
      }
  
    return res
  }
 
  const dispatch = useDispatch<any>()

    useEffect(() => {
        window.addEventListener('resize',() => {
          dispatch(sizeAction.setSize())
          dispatch(directionActions.setDirection())
        })
    },[countLifes])

  return  <div> 
            {countLifes === 0 && <Input submitFn={submitCountLifes} placeHolder="Enter count lifes" type=""></Input>}  
            {countLifes > 0 && lifes}     
          </div>
}

export default App;

