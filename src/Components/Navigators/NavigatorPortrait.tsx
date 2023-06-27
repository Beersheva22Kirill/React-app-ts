import { AppBar, AppBarProps, Box, Divider, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Tab, Tabs, Toolbar, Typography, useTheme } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';


const NavigatorPortrait: React.FC <{navItem:string[][]}> = (nav) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [value,setValue] = useState(0);
    let index = getCurrentPage()

    useEffect(() => {
        index = getCurrentPage();
        navigate(nav.navItem[index][0]);
        setValue(index)
    },[nav])

    const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    };

    const boxItem: ReactNode = <Box sx={{ width: 250 }}
                                    role = 'presentation'>
                                        {getListItem()}
                                    <Divider />
                                </Box>

    function getCurrentPage(){
        let index = nav.navItem.findIndex(r => r[0] === location.pathname);
        if(index < 0){
            index = 0;
          }
        return index;
    }

    function getListItem() : ReactNode {
        return  <List>{nav.navItem.map((item) => <ListItem sx={{color:'black'}} onClick={toggleDrawer(false)} 
                                                        key={item[1]} 
                                                        disablePadding 
                                                        component={Link} 
                                                        to = {item[0]}>
                                                        <ListItemButton onClick={toggleDrawer(false)}> 
                                                            <ListItemText primary={item[1]} />
                                                        </ListItemButton>
                                                </ListItem>)}
                                                </List>
      }

   


    return <Box mt ={10}>
                <AppBar sx={{backgroundColor:'lightgray', color: "black"}}>
                <Toolbar>
                <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                    {nav.navItem[index][1]}
                </Typography>
                </Toolbar>
                </AppBar> 
                <SwipeableDrawer
                    anchor={"left"}
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                      {boxItem}  
                </SwipeableDrawer>
                <Outlet></Outlet> 
           </Box>

}

export default NavigatorPortrait;
