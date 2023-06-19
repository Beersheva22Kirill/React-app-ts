import {useRef, useState } from "react";
import NewAlert from "./NewAlert";
import { StatusType } from "../../Model/StatusType";
import NewInputResult from "../../Model/NewInputResult";

type Props = {
    submitFn: (inputText: string) => NewInputResult;
    placeholder: string;
    buttonTitle? : string;
    type?: string
}
const NewInput: React.FC<Props> = ({submitFn, placeholder, buttonTitle, type}) => {
    
   const inputElementRef = useRef<HTMLInputElement>(null);
   const [disabled, setDisabled] = useState<boolean>(true);
   const [message, setMessage] = useState<string>("");
   const status = useRef<StatusType>("success");
    
   function onClickFn(){

        const res = submitFn(inputElementRef.current!.value);
        status.current = res.status;
        if(res.status === "success"){
          inputElementRef.current!.value = ''
        }
        setMessage(res.message || '');
        res.message && setTimeout(() => setMessage(''), 5000);
    }
    function onChangeFn() {
        setDisabled(!inputElementRef.current?.value)
    }
    return <div>
        <input type={type || 'text'} placeholder={placeholder} ref={inputElementRef}
        onChange={onChangeFn}/>
        <button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'GO' }</button>
        {message && <NewAlert status = {status.current} message={message}></NewAlert>}
    </div>
}
export default NewInput;
