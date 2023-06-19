import { CSSProperties } from "react";
import { StatusType } from "../../Model/StatusType";

type Props = {
    status: StatusType;
    message:string;
}

const statusesProps: Map<StatusType,CSSProperties> = new Map([
    ["error",{backgroundColor:'lightred'}],
    ["success",{backgroundColor:'lightgreen'}],
    ["warning",{backgroundColor: "orange"}]
])

const NewAlert:React.FC<Props> = ({status,message}) => {

    return <div>
        <p style={statusesProps.get(status)}>{message}</p>
    </div>
}

export default NewAlert;
