import LoginData from "../Model/LoginData";
import UserData from "../Model/UserData";


export default interface AutentificationService {

    login(loginData:LoginData): Promise<UserData|null>;
    logout():Promise<void>;

}