import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import { CSSProperties} from "react";


const SignOut:React.FC = () => {
   
    const dispatch = useDispatch<any>()
    const style: CSSProperties = {
        display:'flex',
        justifyContent: "center"
    }

    function onClickFn() {
        dispatch(userStateAction.setStatus('unauthorized'))
        localStorage.removeItem('currUser');
    }
   
    return  <div style={style}>
                <button  onClick={onClickFn}>confirm sign out</button>
            </div>
    
    
    

}

export default SignOut;