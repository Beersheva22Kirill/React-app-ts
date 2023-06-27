import {useRef, useState } from "react";
import InputResult from "../../Model/InputResult";

import { StatusType } from "../../Model/StatusType";
import { Alert, Button, TextField } from "@mui/material";

type Props ={
    submitFn: (inputText:string) => InputResult;
    placeHolder: string;
    buttonTitle?: string;
    type?: string;
      
}

const Input :React.FC<Props> = ({submitFn,placeHolder,buttonTitle,type}) => {

   const defaultMessage:InputResult = {status:"success",message: []}; 
   let inputElementRef = useRef<any>(null);

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

   function onChangeFn(event: any){
     inputElementRef.current = event.target as any
        setDisabled(!event.target.value)
   }

    return <div>
            <TextField type = {type || "text" } placeholder = {placeHolder} ref={inputElementRef} onChange={onChangeFn}></TextField>
            <Button onClick={onClickFn} disabled = {disabled}>{buttonTitle || 'Go'}</Button>
            {message.length > 0 && <Alert severity={status}>{message}</Alert> }
           </div>
}

export default Input


