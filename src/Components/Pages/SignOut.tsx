import { useDispatch } from "react-redux";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import { CSSProperties} from "react";
import {Button, Box} from "@mui/material";


const SignOut:React.FC = () => {
   
    const dispatch = useDispatch<any>()
    const style: CSSProperties = {
        display:'flex',
        justifyContent: "center"
    }

    function onClickFn() {
        dispatch(userStateAction.setStatus({email:"unauthorized",role:"unauthorized"}))
        localStorage.removeItem('localUser');
    }
   
    return  <Box style={style}>
                <Button  onClick={onClickFn}>confirm sign out</Button>
            </Box>
    
    
    

}

export default SignOut;