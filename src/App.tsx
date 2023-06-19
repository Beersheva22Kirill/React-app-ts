
import Clocks from "./Components/Clock/CLocks";
import NewClocks from "./Components/newClocks/NewCLocks";

import './App.css';
import { ReactNode, useState } from "react";
import InputResult from "./Model/InputResult";
import A from "./Components/A";
import B from "./Components/B";
import Input from "./Components/common/Input";
import NewInputResult from "./Model/NewInputResult";
import NewInput from "./Components/common/NewInput";

const components: Map<string,ReactNode> = new Map(
  [
    ['NewClocks',<NewClocks></NewClocks>],
    ['clocks',<Clocks></Clocks>],
    ['A',<A></A>],
    ['B',<B></B>]
  ]
)
const App: React.FC = () => {

  const [componentName, setComponentName] = useState<string>('')

  function submitFn(component:string): NewInputResult{
      const res:NewInputResult = {status:"error",
      message:`Component with name ${component} not found` }
      if (components.has(component)){
        res.status = "success"
        res.message = "";
        setComponentName(component);
      }
  return res;
    }

  return  <div className="app-class">
              {/* <NewClocks></NewClocks>
              <Clocks></Clocks> */}
              <NewInput submitFn={submitFn} placeholder="Enter name of component"></NewInput>
              {componentName && components.get(componentName)}
          </div>
}

export default App;

