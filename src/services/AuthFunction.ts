
import navConfig from '../Config/config-nav.json'
import UserData from '../Model/UserData'

    export function getMenuItem(user:UserData):string[][]{
        let items = navConfig.authorized

        if(user.role === 'admin'){
            items = navConfig.admin
        } else if (user.role === 'unauthorized') {
            items = navConfig.unauthorized
        }

        if(user.role != 'unauthorized') {
            items[items.length - 1][1] = user.email
        }
        return items
    }
   

