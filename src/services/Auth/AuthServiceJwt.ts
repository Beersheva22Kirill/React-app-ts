import { useDispatch } from "react-redux";
import LoginData from "../../Model/LoginData";
import UserData from "../../Model/UserData";
import AuthentificationService  from "./AuthentificationService";
import { userStateAction } from "../../Redux/Slices/autorizedSlice";
import { SERVER_NOT_AVALIABLE } from "../../Config/service-configuration";

export const AUTH_DATA_JWT = 'auth-data-jwt'
export default class AuthServiceJwt implements AuthentificationService {
    
    constructor(private url: string){
       
    }
    
    async login(loginData:LoginData): Promise<UserData|null> {
        let responseLogin:UserData|null = null    
            try {
                const response = await fetch(this.url,{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                });
                
                if (response.status != 400){
                    const data = await response.json();
                    const jwt = data.accessToken;
                    localStorage.setItem(AUTH_DATA_JWT,jwt);
                    const jwtPayloadJson = atob(jwt.split('.')[1])
                    const userData = JSON.parse(jwtPayloadJson);
                    responseLogin = {email:userData.sub,role:userData.roles.includes("ADMIN")? "admin" : "user"};
                    localStorage.setItem('localUser',JSON.stringify(responseLogin))
                
                } 
            } catch (error) {
               
            } finally{
                return responseLogin
            }
           
        
    }


    async logout(): Promise<void> {
      
        localStorage.removeItem(AUTH_DATA_JWT)
        localStorage.removeItem('localUser');
    }

}