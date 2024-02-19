import React from 'react'
import '../Template.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import uuid from 'react-uuid'
import {useNavigate} from 'react-router-dom'; 
import party from '../images/party.png';
import contact from '../images/contact.png';
import blank from '../images/blank.png';


const Template = () => {
    const navigate = useNavigate();
    const createForm = () => {
        const id_ = uuid();
        navigate('/form/'+id_)

    }

    return (
        <div className='template_section'>
            <div className='template_top'>
                <div className='tmeplate_left'>
                    <span style={{fontSize:"16px",color:"#202124"}}>Start New Form</span>
                </div>

                <div className='template_right'>
                    <div className='gallery_button'>
                        Template gallery
                        <UnfoldMoreIcon />
                    </div>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className='template_body'>
                <div className="card" onClick={createForm}>
                    <img src={blank} alt="no image" className='card_image'/>
                    <p className='card_title'>Blank</p>
                </div>

                <div className="card">
                    <img src={party} alt="no image" className='card_image'/>
                    <p className='card_title'>Party Invite</p>

                </div>

                <div className="card">
                    <img src={contact} alt="no image" className='card_image'/>
                    <p className='card_title'>Contact</p>

                </div>
            </div>

        </div>
    )
}

export default Template