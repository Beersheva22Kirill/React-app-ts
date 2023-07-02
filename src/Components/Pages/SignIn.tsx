import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import InputResult from "../../Model/InputResult";
import Input from "../common/Input";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import SignInForm from "../Forms/SignInForm";
import LoginData from "../../Model/LoginData";
import AuthServiceJwt from "../../services/AuthServiceJwt";
import UserData from "../../Model/UserData";
import {StatusType} from "../../Model/StatusType";
import { useState } from "react";
import {authService} from "../../Config/service-configuration"





const SignIn:React.FC = () => {
     
    const dispatch = useDispatch<any>()
    const [statusLogin,setStatusLogin] = useState<StatusType>('success')
    async function submitFn(user:LoginData):Promise<void>{
        const userData:UserData|null = await authService.login(user)
        if(userData){
            dispatch(userStateAction.setStatus(userData));
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

export default SignIn;