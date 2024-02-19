import React from 'react';
import '../Header.css';
import MenuIcon from '@mui/icons-material/Menu'
import {IconButton} from '@mui/material'
import google_form from '../images/google_form.svg'
import SearchIcon from '@mui/icons-material/Search'
import AppsIcon from '@mui/icons-material/Apps'
import Avatar from '@mui/material/Avatar'
import TemporaryDrawer from './TemporaryDrawer';

const Header = () => {
    return (
        <div className='header'>
            <div className='header_info'>
                {/* <IconButton>
                    <MenuIcon />
                </IconButton> */}
                <TemporaryDrawer />
                <img src={google_form} alt="google form logo"/>
                <div className='info'>
                    Forms
                </div>
            </div>
            <div className='header_search'>
                <IconButton>
                    <SearchIcon/>

                </IconButton>
                <input type='text' name='search' placeholder='Search....'/>
            </div>
            <div className='header_right'>
                <IconButton>
                    <AppsIcon/>
                </IconButton>

                <IconButton>
                    <Avatar src=""/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header