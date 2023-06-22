import {useRef, useState } from "react";
import InputResult from "../../Model/InputResult";
import Alert from "./Alert";
import { StatusType } from "../../Model/StatusType";

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
   const [status,setStatus] = useState<StatusType>(defaultMessage.status) 
   const [message,setMessage] = useState<string[]>(defaultMessage.message) 
   
   function onClickFn() {
     const res = submitFn(inputElementRef.current!.value);
     setStatus(res.status);
     setMessage(res.message);
        
     res.status !== "success" && setTimeout(() => {
          setStatus(defaultMessage.status);
          setMessage(defaultMessage.message);
        }, 5000)
   }

   function onChangeFn(){
        setDisabled(!inputElementRef.current?.value)
   }

//    useEffect(() => {
//      setDisabled(!inputElementRef.current?.value)
//    },[inputElementRef.current?.value])

    return <div>
            <input type = {type || "text" } placeholder = {placeHolder} ref={inputElementRef} onChange={onChangeFn}></input>
            <button onClick={onClickFn} disabled = {disabled}>{buttonTitle || 'Go'}</button>
            {status !== "success" && <Alert status={status} message={message}></Alert>  }
           </div>
}

export default Input
