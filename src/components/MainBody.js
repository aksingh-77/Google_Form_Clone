import React from 'react';
import '../MainBody.css';

import StorageIcon from '@mui/icons-material/Storage';
import ArrowDrapDownIcon from '@mui/icons-material/ArrowDropDown';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {IconButton} from '@mui/material';
import doc_template from '../images/doc_template.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MainBody = () => {
    return (
        <div className="mainbody">
            <div className="mainbody_top">
                <div className="mainbody_top_left" style={{fontSize: "16px", fontWeight: "500"}}>
                    Recent forms
                </div>
                <div className="mainbody_top_right">

                    <div className="mainbody_top_center" style={{fontSize: "14px", marginRight:"125px"}}>
                        Owned by anyone<ArrowDrapDownIcon/>
                    </div>
                    <IconButton>
                        <StorageIcon style={{fontSize: '16px',color: "black"}}/>
                    </IconButton>

                    <IconButton>
                        <FolderOpenIcon style={{fontsize: '16px', color: "black"}}/>
                    </IconButton>

                </div>
            </div>
            <div className="mainbody_doc">
                <div className="doc_card">
                <div className="doc_card_content">
                    <img src={doc_template} className="doc_image" />
                    
                        <div className="doc_content" style={{fontSize:"12px",color: "grey"}}>
                        <div className="content_left">
                                <StorageIcon style={{color:"white", fontSize:"12px", backgroundColor:"#6E2594", padding: "3px",marginRight:"3px",borderRadius:"2px"}}/>
                            </div>
                            <h5>Open 6 Feb</h5>
                            <MoreVertIcon style={{fontSize:"16px",color: "grey"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainBody