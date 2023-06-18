import {useRef, useState } from "react";
import InputResult from "../../Model/InputResult";
import Alert from "./Alert";

type Props ={
    submitFn: (inputText:string) => InputResult;
    placeHolder: string;
    buttonTitle?: string;
    type?: string;
      
}

const Input :React.FC<Props> = ({submitFn,placeHolder,buttonTitle,type}) => {
   const defaultMessage:InputResult = {status:"success",message: []}; 
   const inputElementRef = useRef<HTMLInputElement>(null);
   const [disabled, setDisabled] = useState<boolean>(true);

   const [alertMessage,setAlertMessage]= useState<InputResult>(defaultMessage);


   function onClickFn() {
        const res = submitFn(inputElementRef.current!.value);
        setAlertMessage(res);
        alertMessage.status != "success" && setTimeout(() => {
          setAlertMessage({status:"success",message: []});
        }, 5000)
   }

   function onChangeFn(){
        setDisabled(!inputElementRef.current?.value)
   }

    return <div>
            <input type = {type || "text" } placeholder = {placeHolder} ref={inputElementRef} onChange={onChangeFn}></input>
            <button onClick={onClickFn} disabled = {disabled}>{buttonTitle || 'Go'}</button>
            {alertMessage.status != "success" && <Alert alertMessage={alertMessage}></Alert>  }
           </div>
}

export default Input
