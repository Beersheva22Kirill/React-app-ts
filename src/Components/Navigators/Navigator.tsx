
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';

const Navigator:React.FC<{navItem:string[][]}> = (nav) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value,setValue] = useState(0);
    
    useEffect(() => {
        let index = nav.navItem.findIndex(r => r[0] === location.pathname);
        if(index < 0){
          index = 0;
        }
        navigate(nav.navItem[index][0]);
        setValue(index)
    },[nav])
   
    function onChangeFn (event: any, newValue: number) {
      setValue(newValue);
    }

    function getTabs() : ReactNode {
      return nav.navItem.map((item) => <Tab component = {Link} to = {item[0]} label = {item[1]} key={item[1]}></Tab>)
    }
    
    return  <Box mt ={10}>
      <AppBar sx = {{backgroundColor:'lightgray'}}>
          <Tabs value={value} onChange={onChangeFn} aria-label="basic tabs example">
            {getTabs()}
          </Tabs>
      </AppBar>
      <Outlet></Outlet> 
    </Box>
}

export default Navigator;
