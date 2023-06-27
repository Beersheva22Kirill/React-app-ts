import { useDispatch } from "react-redux";
import InputResult from "../../Model/InputResult";
import Input from "../common/Input";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";





const SignIn:React.FC = () => {
    const dispatch = useDispatch<any>()

    function submitFn(value:string):InputResult{
        let res:InputResult = {status:"success", message:[`success`]}

        setTimeout(() => {
            dispatch(userStateAction.setStatus(value))
            localStorage.setItem('currUser',value)
        },2000)
        
        return res;
    }

    return  <div>
                <div className="block-of-page">
                    <p className = "component-logo" style={{textAlign:"center"}}>SignIn</p>
                    <Input submitFn={submitFn} placeHolder="Enter user name"></Input>
                </div>
            </div>
}

export default SignIn;