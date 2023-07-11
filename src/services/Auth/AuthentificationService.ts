import LoginData from "../../Model/LoginData";
import UserData from "../../Model/UserData";


export default interface AuthentificationService {

    login(loginData:LoginData): Promise<UserData|null>;
    logout():Promise<void>;

}