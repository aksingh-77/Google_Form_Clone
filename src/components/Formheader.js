import React,{useContext} from "react";
import '../css/Formheader.css';
import form_image from "../images/google_form.svg";
import {Fistar, Fisettings, FiStar} from "react-icons/fi"
import {AioutlineEye} from 'react-icons/ai';
import { IconButton} from '@mui/material';
import {IoMdFolderOpen} from "react-icons/io"
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MorevertIcon from '@mui/icons-material/MoreVert';
import { AiOutlineEye } from "react-icons/ai";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { FiSettings } from "react-icons/fi";
//import { useStateValue } from "../redux/StateProvider";
import {useNavigate} from 'react-router-dom';
import { StateContext } from "../App";

const Formheader = () => {
    const navigate = useNavigate();
    const {State, dispatch} = useContext(StateContext);
    const doc_name = State.document_name;
    
    
    return (
        <div className="form_header">
            <div className="form_header_left">
                <img src={form_image} style={{height:"45px", width:"40px"}} />
                <input type="text" placeholder="Untitled form" className="form_name" value={doc_name}></input>
                <IoMdFolderOpen className="form_header_icon" style={{marginRight:"10px"}}></IoMdFolderOpen>
                <FiStar className="form_header_icon" style={{marginRight:"10px"}} />
                <span style={{fontSize:"12px", fontWeight:"600"}}>All changes saved in Drive</span>
            </div>

            <div className="form_header_right">
                <IconButton>
                    <ColorLensIcon Lens Icon size="small" className="form_header_icon"/>
                </IconButton>
                <IconButton onClick={() => navigate('/response')}>
                    <AiOutlineEye className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <FiSettings className="form_header_icon" />
                </IconButton>
                
                <Button variant="contained" color="primary" href="#contained-buttons">Send</Button>
                

                <IconButton>
                    <MorevertIcon className="form_header_icon" />
                </IconButton>
                <IconButton>
                    <Avatar style={{height:"30px",width: "30px"}} src="" />
                </IconButton>
            </div>
                
            
        </div>
    )
}

export default Formheader