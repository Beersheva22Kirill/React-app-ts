import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import SignInForm from "../Forms/SignInForm";
import LoginData from "../../Model/LoginData";
import UserData from "../../Model/UserData";
import {authService} from "../../Config/service-configuration"
import { CodePayload } from "../../Model/CodePayload";
import CodeType from "../../Model/CodeType";
import { codeAction } from "../../Redux/Slices/codeSlice";


const SignIn:React.FC = () => {
     
    const dispatch = useDispatch<any>()

    async function submitFn(user:LoginData):Promise<void>{
        const alertMessage:CodePayload = {code: CodeType.OK, message:''}
        const userData:UserData|null = await authService.login(user)
        if(userData){
            dispatch(userStateAction.setStatus(userData));
            alertMessage.message = 'Authentification success'
        } else {
            alertMessage.code = CodeType.AUTH_ERROR
            alertMessage.message = 'Incorect username or password'
        }
        dispatch(codeAction.set(alertMessage))
               
    }

    return  <Box>
                <SignInForm callbackFn={submitFn}></SignInForm>
            </Box>
}

export default SignIn;