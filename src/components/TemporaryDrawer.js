import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'
import {IconButton} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider';
import {FiSettings} from 'react-icons/fi'
import {BsQuestionCircle} from 'react-icons/bs'

import '../css/TemporaryDrawer.css';


import docs from '../images/docs.svg';
import drive from '../images/drive.svg';
import excelsheet from '../images/excelsheets.svg';
import google_form from '../images/google_form.svg';
import slides from '../images/slides_2020q4_48dp.png'


// const useStyle = makeStyle({
//     listItem:{
//         marginLeft:"20px", fontSize:"14px", fontweight: "500",color: "grey"
//     }
// })

const TemporaryDrawer = () => {
    // const classes = useStyle()
    const [state, setState] = useState({
        left: false
    })


    const toggleDrawer = (anchor, open) => event => {
        setState({...state, [anchor]:open});
    }

    

    const list = (anchor) => {
        return (
        <div style={{width:"250px"}} role = "presentation">
            <Divider />
            <List>
                <ListItem style={{fontSize:"480px", marginLeft:"5px"}}>
                <ListItemText style={{fontSize: "48px",marginLeft: "5px"}}>
                    <span className='slideImages'> <b>Google</b></span>
                    <span className='slideImages'> Docs</span>
                </ListItemText>
                </ListItem>
            </List>
            <Divider />

            <Divider/>
            <List >
                <ListItem className="list_item">
                    <img src={docs}  />
                    <div className="listItem" > Docs</div>
                </ListItem>

                <ListItem className="list_item">
                    <img src={excelsheet}  />
                    <div className="listItem" > Sheets</div>
                </ListItem>

                <ListItem className="list_item">
                    <img src={slides} />
                    <div className="listItem"> Slides</div>
                </ListItem>

                <ListItem className="list_item">
                    <img src={google_form} />
                    <div className="listItem"> Forms </div>
                </ListItem>
            </List>
            <Divider />

            <Divider />
            
            <List>
                <ListItem className="list item">
                    <FiSettings />
                    <div> Settings</div>
                </ListItem>
                <ListItem className="list item">
                    <BsQuestionCircle/>
                    <div> Help & Feedback</div>
                </ListItem>
            </List>
            <Divider />
            <List>

                <ListItem className="list_item">
                    <img src={drive} />
                    <div className="listItem"> Drive </div>
                </ListItem>
            </List>
            
        </div>
        )
    }


    return (
        <div>
            <React.Fragment>
            <IconButton onClick={toggleDrawer('left',true)}>
                <MenuIcon />
            </IconButton>
            <Drawer open={state['left']} onClose={toggleDrawer('left',false)} anchor={'left'}>
                {list('left')}
            </Drawer>
            </React.Fragment>
        </div>
    )
}

export default TemporaryDrawer