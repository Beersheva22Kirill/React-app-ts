import {useRef, useState } from "react";
import InputResult from "../../Model/InputResult";

import { StatusType } from "../../Model/StatusType";
import { Alert, Button, TextField } from "@mui/material";

type Props ={
    submitFn: (inputText:string) => void;
    placeHolder: string;
    buttonTitle?: string;
    type?: string;
      
}

const Input :React.FC<Props> = ({submitFn,placeHolder,buttonTitle,type}) => {

   let inputElementRef = useRef<any>(null);

   const [disabled, setDisabled] = useState<boolean>(true);
   
   function onClickFn() {
     const res = submitFn(inputElementRef.current!.value);
   }
   function onChangeFn(event: any){
     inputElementRef.current = event.target as any
        setDisabled(!event.target.value)
   }

    return <div>
            <TextField type = {type || "text" } placeholder = {placeHolder} ref={inputElementRef} onChange={onChangeFn}></TextField>
            <Button sx={{ ml: 2}} variant="contained" onClick={onClickFn} disabled = {disabled}>{buttonTitle || 'Go'}</Button>
           </div>
}


export default Input


