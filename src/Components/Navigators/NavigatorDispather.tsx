import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import Navigator from "./Navigator";
import NavigatorPortrait from "./NavigatorPortrait";

const NavigatorDispather:React.FC<{navItem:string[][]}> = (nav) => {
    
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('sm'));
    return isPortrait ? <NavigatorPortrait navItem={nav.navItem}/>:<Navigator navItem={nav.navItem}/>
}

export default NavigatorDispather;