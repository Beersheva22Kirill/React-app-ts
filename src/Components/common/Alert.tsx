import { CSSProperties, useEffect, useState } from "react";
import InputResult from "../../Model/InputResult"


type Props = {
    alertMessage:InputResult;
}

const Alert: React.FC<Props> = (alertMessage) => {

    const style_p:CSSProperties = {
        margin:0,
    }

    const style_div:CSSProperties = {
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }

    let color:CSSProperties;

    color = alertMessage.alertMessage.status == "error" ?  {color:'red', fontWeight:"bold" } : {color:'yellow',fontWeight:"bold" }

    return <div>
            {alertMessage.alertMessage.status != "success" && 
                <div style={style_div}><p style={color}>{alertMessage.alertMessage.status}</p>
                {alertMessage.alertMessage.message.map(str => <p style={style_p}>{str}</p>)}
                </div>} 
           </div>
}

export default Alert;