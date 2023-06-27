import LoginData from "../Model/LoginData";
import UserData from "../Model/UserData";
import { AutentificationService } from "./AuthentificationService";

export default class AuthServiceJwt implements AutentificationService {
    
    constructor(private url: string){

    }
    
    async login(loginData:LoginData): Promise<UserData|null> {
        const response = await fetch(this.url,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        let responseLogin:UserData|null = null
        if (response.status != 400){
            const data = await response.json();
            const payloadJson = atob(data.accessToken.split('.')[1])
            const userData = JSON.parse(payloadJson);
            responseLogin = {email:userData.email,role:userData.sub};
        }
       
        //TODO
        return responseLogin
    }


    async logout(): Promise<void> {
        //TODO
    }

}