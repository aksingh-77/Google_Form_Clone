import React from 'react';
import '../css/CenteredTabs.css';
import {makeStyles} from '@mui/styles';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


const useStyles = makeStyles({
    root:{
        flexGrow:1
    },
    tab:{
        fontSize:12,
        color:"#5f6368",
        textTransform: "Capitalize",
        height:10,
        fontWeight:"600",
        fontFamily: 'Google Snas, Roboto, Arial, sans-serif'
    },
    tabs:{
        height:10

    }
})



const CenteredTabs = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
                <Tabs centered textColor='primary' indicatorColor='primary' className={classes.tabs}>
                    <Tab label="Questions" className={classes.tab}>

                    </Tab>

                    <Tab label="Responses" className={classes.tab}>

                    </Tab>
                </Tabs>
            </Paper>


        </div>
    )
}

export default CenteredTabs

