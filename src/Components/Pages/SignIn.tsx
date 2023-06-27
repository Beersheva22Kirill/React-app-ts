import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import InputResult from "../../Model/InputResult";
import Input from "../common/Input";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import SignInForm from "../Forms/SignInForm";
import LoginData from "../../Model/LoginData";
import AuthServiceJwt from "../../services/AuthServiceJwt";
import { AutentificationService } from "../../services/AuthentificationService";
import UserData from "../../Model/UserData";
import {StatusType} from "../../Model/StatusType";
import { useState } from "react";





const SignIn:React.FC = () => {
    const authService:AutentificationService = new AuthServiceJwt("http://localhost:3500/login")
    const dispatch = useDispatch<any>()
    //FIXME sould work with real form and real auth service
    const [statusLogin,setStatusLogin] = useState<StatusType>('success')
    async function submitFn(user:LoginData):Promise<void>{
        const userData:UserData|null = await authService.login(user)
        if(userData){
            dispatch(userStateAction.setStatus(userData));
            localStorage.setItem('localUser',JSON.stringify(userData))
        } else {
            setStatusLogin("error")
        }
        
        console.log(userData);
               
    }

    return  <Box>
                <SignInForm callbackFn={submitFn}></SignInForm>
                {statusLogin !="success" && <Alert severity={statusLogin}>Wrong login or password</Alert>}
            </Box>
}

{/* <div>
<div className="block-of-page">
    <p className = "component-logo" style={{textAlign:"center"}}>SignIn</p>
    <Input submitFn={submitFn} placeHolder="Enter user name"></Input>
</div>
</div> */}

export default SignIn;