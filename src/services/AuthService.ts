
import navConfig from '../Config/config-nav.json'

    export function getMenuItem(role:string):string[][]{
        let items = navConfig.authorized
        if(role === 'admin'){
            items = navConfig.admin
        } else if (role === 'unauthorized') {
            items = navConfig.unauthorized
        }
        return items
    }
   

