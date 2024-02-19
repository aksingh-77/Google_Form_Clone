import React, {useState, useEffect} from 'react';
import '../css/QuestionForm.css'

import CroporiginalIcon from '@mui/icons-material/Copyright';
// import MorevertIcon from '@mui/icons-material/MoreVert';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ShortTextIcon from '@mui/icons-material/ShortText'
import SubjectIcon from '@mui/icons-material/Subject';
import MorevertIcon from '@mui/icons-material/MoreVert';
import {BsTrash} from "react-icons/bs"
import { IconButton} from '@mui/material';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {BsFileText} from "react-icons/bs"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import {FcRightUp} from "react-icons/fc"
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CropOriginalIcon from '@mui/icons-material/Crop'
// import Short from ''

const QuestionForm = () => {
    const [questions, setQuestions] = useState([
        {questionText: "What is capital of India ?", 
         questionType:"radio", 
         option: [{optionText:"Bengaluru"}, 
                 {optionText:"Mumbai"}, 
                 {optionText:"Delhi",}, 
                 {optionText:"Uttar Pardesh"}], 
         open:true, 
         required: false
        }
    ])

    function ChangeQuestion(text, i){
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
    }

    function questionUI(){
        // return (<><h1>Question Bank</h1></>)
        
        return questions.map((ques, i) => (
            // console.log(ques.questionText);
            <Accordion expanded={ques.open} className={ques.open ? "add_border":""}>
                <AccordionSummary aria-controls='panelia-content' id='panelia-header' elevation={1} style={{width:'100%'}}>
                {!ques.open ? (
                    <div className="saved_questions">
                        {/* To show the question here */}
                        <Typography style={{fontSize: "15px", fontweight: "400", letterSpacing: '1px',lineHeight: '24px', paddingBottom: "8px"}} >
                            {i+1}. {ques.questionText}
                        </Typography> 
                        

                        
                        {ques.option.map((op, j)=>(
                            <div key={j} >
                                <div style={{display: 'flex'}}>
                                    <FormControlLabel style={{marginLeft: "5px",marginBottom: "5px"}} disabled control={<input type={ques.questionType}
                                        color="primary" style={{marginRight: '3px'}} required={ques.required} />} 
                                        label={
                                            <Typography style={{fontFamily: 'Roboto, Arial, sans-serif',
                                                fontSize: '13px',fontweight: '400',letterspacing: '.2px',lineHeight: '20px', color:'#202124'}} >
                                                {op.optionText}
                                            </Typography>
                                        } />     
                                </div>
                            </div>
                        
                        ))}
                    </div>
                ) : ""}
                </AccordionSummary>


             
                {/* Here it is to create the questions tab from here */}
                <div className='question_boxs'>
                    <AccordionDetails className='add_question'>
                        <div className="add_question_top">
                            {i+1}
                            <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => {ChangeQuestion(e.target.value, i)}}></input>
                            <CroporiginalIcon style={{color: "#5f6368"}} />
                            <Select className="select" style={{color: "#5f6368", fontSize:"13px"}}>
                                <MenuItem id="text" value="Text"> <SubjectIcon style={{marginRight: "10px"}} /> Paragraph</MenuItem>
                                <MenuItem id="checkbox" value="Checkbox" ><CheckBoxIcon style={{marginRight:"10px",color: "#70757a"}} checked />CheckBox </MenuItem>
                                <MenuItem id="radio" value="Radio" > <Radio style={{marginRight: "10px",color: "#70757a"}} checked/> Multiple Choice </MenuItem>
                            </Select>
                        </div>
                        
                         {ques.option.map((op, j)=>(
                            <div className="add_question_body" key={j}>
                            {
                                (ques.questionType!="text") ?
                                <input type={ques.questionType} style={{marginRight:"10px"}}/> :
                                <ShortTextIcon style={{marginRight: "10px"}} />
                            } 
                            <div>
                                <input type="text" className="text_input" placeholder="option" value={op.optionText} />
                            </div>

                            {/* <CropOriginalIcon style={{color: "#5f6368"}}/> */}

                            <IconButton aria-label="delete" >
                                <CloseIcon/>
                            </IconButton>
                            </div>
                        ))}  

                        {ques.option.length < 5 ?
                            <div className="add_question_body">
                                <FormControlLabel disabled control={(ques.questionType!="text") ?
                                    <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            style={{marginLeft: "10px",marginRight:"10px"}} disabled /> :

                                    <ShortTextIcon style={{marginRight:"10px"}} />
                                } 
                                
                                label={<div>
                                    <input type="text" className="text_input" style={{fontSize: "13px",width: "60px"}} placeholder="Add other"></input>
                                    <Button size="small" style={{textTransform: 'none', color: "#4285f4", fontSize: "13px", fontweight: "600"}}>Add Option</Button>
                                </div>
                                } />
                            </div>
                        :""}

                        <div className="add_footer">
                            <div className="add_question_bottom_left">
                                <Button size="small" style={{textTransform: 'none', color: "#4285f4", fontsize: "13px", fontweight:"600"}}>
                                <FcRightUp style={{border:"2px solid #4285f4", padding: "2px", marginRight: "8px"}} /> Answer key</Button>
                            </div>

                            <div className="add_question_bottom">

                                <IconButton aria-label="Copy">
                                    <FilterNoneIcon />
                                </IconButton>

                                <IconButton aria-label="delete" >
                                    <BsTrash />
                                </IconButton>

                                    <span style={{color: "#5f6368", fontSize: "13px"}}>Required </span> <Switch name="checkedA" color="primary" checked />
                                <IconButton>
                                    <MorevertIcon />
                                </IconButton>
                            </div>
                        </div>
                    </AccordionDetails>

                    <div className="question_edit">
                        <AddCircleOutlineIcon className="edit" />
                        <OndemandVideoIcon className="edit" />
                        <CropOriginalIcon className="edit" />
                        <TextFieldsIcon className="edit" />
                    </div>
                </div>
                
            </Accordion>
        ))
    }

    return (
        <div>
            <div className="question_form">
                <br></br>
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                            <input type="text" className="question_form_top_name" style={{color: "black"}} placeholder="Untitled document" ></input>
                            <input type="text" className="question_form_top_desc" placeholder="Form Description" ></input>
                        </div>
                    </div>
                    {questionUI()}
                </div>
            </div>


        </div>
    )
}

export default QuestionForm