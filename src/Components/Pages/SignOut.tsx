import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";


const SignOut:React.FC = () => {
    
    const dispatch = useDispatch<any>()
    dispatch(userStateAction.setStatus('unauthorized'))
    return  <div>
                <p className = "component-logo" style={{textAlign:"center"}}>SignOut</p>
            </div>
}

export default SignOut;