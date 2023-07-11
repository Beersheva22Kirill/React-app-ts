import LoginData from "../../Model/LoginData";
import UserData from "../../Model/UserData";
import AuthentificationService from "./AuthentificationService";
import {getFirestore,collection, getDoc, doc} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth,signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import appFireBase from "../../Config/firebase-config";

export default class AuthServiceFire implements AuthentificationService {
    
        private auth = getAuth(appFireBase)
    private administrators = collection(getFirestore(appFireBase), 'administrators')
    
    async login(loginData: LoginData): Promise<UserData | null> {
      
       let userData:UserData|null = null; 
       try {
           const userAuth = loginData.email === 'GOOGLE' 
           ? await signInWithPopup(this.auth, new GoogleAuthProvider()) 
           : await signInWithEmailAndPassword(this.auth, loginData.email,loginData.password)
           userData = {email:userAuth.user.email as string, role: await this.isAdmin(userAuth.user.uid)? 'admin' : 'user'} 
       } catch (error) {

       }
       return userData;
    }
    
    
    async logout(): Promise<void> {
        return signOut(this.auth)
    }

    private async isAdmin(uid:any): Promise<boolean> {
        const docRef = doc(this.administrators, uid)
        
        return (await getDoc(docRef)).exists()
    }

}
