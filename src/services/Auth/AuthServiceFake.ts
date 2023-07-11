import LoginData from "../../Model/LoginData";
import UserData from "../../Model/UserData";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import AuthentificationService from "./AuthentificationService";

export default class AuthServiceFake implements AuthentificationService {
    
   
    async login(loginData: LoginData): Promise<UserData | null> {
        const UserData:UserData = 
        {   email: loginData.email,
            role: loginData.email.includes('admin') ? 'admin' : 'user' 
        }
        return UserData;
    }
    
    async logout(): Promise<void> {
        localStorage.removeItem(AUTH_DATA_JWT)
        localStorage.removeItem('localUser');
    }
    
}

