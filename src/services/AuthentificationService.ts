import LoginData from "../Model/LoginData";
import UserData from "../Model/UserData";


export interface AutentificationService {

    login(loginData:LoginData): Promise<UserData|null>;
    logout():Promise<void>;

}