import React, {useState, useEffect} from 'react';
import '../css/QuestionForm.css'

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
import CropOriginalIcon from '@mui/icons-material/Crop';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import  DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import axios from 'axios';

const QuestionForm = () => {
    const [questions, setQuestions] = useState([
        {questionText: "What is capital of India ?", 
         questionType:"radio", 
         option: [{optionText:"Bengaluru"}, 
                 {optionText:"Mumbai"}, 
                 {optionText:"Delhi",}, 
                 {optionText:"Uttar Pardesh"}],
         answer:false,
         answerKey:"",
         points:0, 
         open:true, 
         required: false
        }
    ])

    const [documentName, setDocumentName] = useState("Untitled Document");
    const [documentDesc, setDocumentDesc] = useState("Add Description");

    const getId = () => {
        let currentURL = window.location.href;
        let parts = currentURL.split('/');
        let value = parts[parts.length - 1];
        console.log(value);
        return value;
    }

    
    function ChangeQuestion(text, i){
        var newQuestion = [...questions];
        newQuestion[i].questionText = text;
        setQuestions(newQuestion);
        //setQuestions([...questions, questions[i].questionText = text]);
        console.log(questions);

    }

    const addQuestionType = (i, type) => {
        let qs = [...questions];
        qs[i].questionType = type;
        setQuestions(qs);
        console.log(questions);
    }

    const changeOptionValue = (value, i, j) => {
        let qs = [...questions];
        qs[i].option[j].optionText = value;
        setQuestions(qs);
    }

    const removeOption = (i, j) => {
        var qs = [...questions];
        if(qs[i].option.length > 1){
            qs[i].option.splice(j, 1);
            setQuestions(qs);
        }
        // console.log(i+--+j)
    }

    const addOption = i =>{
        let qs = [...questions];
        if(qs[i].option.length < 5){
            qs[i].option.push({optionText: "Option " + (qs[i].option.length+1)})   
        }else{
            console.log("Max 5 Options");
        }
        setQuestions(qs)
        console.log(questions)
    }

    const copyQuestion = i => {
        expandCloseAll()
        let qs = [...questions];
        let newQuestion = {...qs[i]};
        setQuestions([...questions, newQuestion]);
    }

    const deleteQuestion = i => {
        let qs = [...questions]
        if(questions.length > 1){
            qs.splice(i, 1);
        }
        setQuestions(qs);
    }

    const requiredQuestion = i => {
        var qs = [...questions];
        qs[i].required = !qs[i].required;
        setQuestions(qs);
        console.log(questions);
    }

    const addMoreQuestionField = () => {
        //let qs = [...questions];
        expandCloseAll()
        setQuestions([...questions, {questionText:"Question", questionType:"radio",option:[{optionText:"Option 1"}], open: true, required: false}])
    }

    const onDragEnd = result => {
        if(!result.destination){
            return;
        }
        let itemgg = [...questions];
        const itemF = reorder(
            itemgg,
            result.source.index,
            result.destination.index
        );
        setQuestions(itemF)
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed)
        return result;
    }


    const expandCloseAll = () => {
        let qs = [...questions];
        for(let j = 0; j<qs.length; j++){
            qs[j].open = false;
        }
        setQuestions(qs);
    }

    const handleExpand = (i)=>{
        let qs = [...questions];
        for(let j = 0; j < qs.length; j++){
            if(i === j){
                qs[i].open = true;
            }else{
                qs[j].open = false;
            }
        }
        setQuestions(qs);

    }

    const setOptionAnswer = (ans, qno) => {
        let Questions = [...questions];
        Questions[qno].answerKey = ans;
        setQuestions(Questions);
    }

    const setOptionPoints = (points, qno) => {
        let Questions = [...questions];
        Questions[qno].points = points;
        setQuestions(Questions);
        console.log("setted points", questions);
    }

    const doneAnswer = i => {
        let Questions = [...questions];
        Questions[i].answer = !Questions[i].answer;
        setQuestions(Questions);
        console.log('after done answer',questions);

    }

    const addAnswer = i => {
        let Questions = [...questions];
        console.log("Hello here")
        Questions[i].answer = !Questions[i].answer;
        setQuestions(Questions);
        console.log(questions);
    }

    let id = getId();
    const commitToDB = () => {
        axios.post(`http://127.0.0.1:9000/add_questions/${id}`,{
            "document_name":documentName,
            "doc_desc":documentDesc,
            "questions":questions,   
        }).then(response => {
            console.log(response.data);
        }).catch(err =>{
            console.log(err);
        })

    }

    

    function questionUI(){
        // return (<><h1>Question Bank</h1></>)
        
        return questions.map((ques, i) => (
        <Draggable key={i} draggableId={i + 'id'} index={i}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div>
                        <div style={{marginBottom: "0px"}}>
                            <div style={{width: '100%', marginBottom: '0px' }}>
                                <DragIndicatorIcon style={{transform: "rotate(-90deg)", color: "#DAE0E2", position: "relative", left: "300px"}} fontSize="small"/>
                            </div>

                            {/*================================To Display Question and its option============================================*/} 
                            <Accordion expanded={ques.open} className={ques.open ? "add_border":""} onChange={()=>handleExpand(i)}>
                                <AccordionSummary aria-controls='panelia-content' id='panelia-header' elevation={1} style={{width:'100%'}}>
                                    {!ques.open ? (
                                        <div className="saved_questions">
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
                                {/*==============================================================================================================*/}


                        
                                {/* ===========================Add New Questions from here====================================================== */}
                        
                                <div className='question_boxs'>
                                    {!questions[i].answer ? (
                                        <AccordionDetails className='add_question'>
                                            {/*==================to add question and select its answer type==============================*/}
                                            <div className="add_question_top">
                                                {i+1} <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e) => {ChangeQuestion(e.target.value, i)}}></input>
                                                <ImageOutlinedIcon style={{color: "#5f6368"}} />
                                                <Select className="select" style={{color: "#5f6368", fontSize:"13px"}} >
                                                    <MenuItem id="text" value="Text" onClick={() => addQuestionType(i, "text")}> <SubjectIcon style={{marginRight: "10px"}} /> Paragraph</MenuItem>
                                                    <MenuItem id="checkbox" value="Checkbox" onClick={() => addQuestionType(i, "checkbox")}><CheckBoxIcon style={{marginRight:"10px",color: "#70757a"}} checked />CheckBox </MenuItem>
                                                    <MenuItem id="radio" value="Radio" onClick={() => addQuestionType(i, "radio")}> <Radio style={{marginRight: "10px",color: "#70757a"}} checked /> Multiple Choice </MenuItem>
                                                </Select>
                                            </div>
                                            {/*=================================================================================================*/}
                                    


                                            {/**===========================To add options from here============================================= */}
                                            {ques.option.map((op, j)=>(
                                                <div className="add_question_body" key={j}>
                                                    {
                                                        (ques.questionType!="text") ?
                                                        <input type={ques.questionType} style={{marginRight:"10px"}}/> :
                                                        <ShortTextIcon style={{marginRight: "10px"}} />
                                                    } 
                                                    <div>
                                                        <input type="text" className="text_input" placeholder="option" value={op.optionText} onChange={(e) => changeOptionValue(e.target.value, i, j)}/>
                                                    </div>

                                                    <ImageOutlinedIcon style={{color: "#5f6368"}}/>

                                                    <IconButton aria-label="delete" >
                                                        <CloseIcon onClick={() => removeOption(i, j)}/>
                                                    </IconButton>
                                                </div>
                                            ))} 
                                            {/*==============================================================================================*/}
                                    

                                            {/*============================To show Add Option Button============================================*/}        
                                            {ques.option.length < 5 ?
                                                <div className="add_question_body">
                                                    <FormControlLabel disabled 
                                                    control={(ques.questionType!="text") ?
                                                        <input type={ques.questionType} color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                        style={{marginLeft: "10px",marginRight:"10px"}} disabled /> 
                                                    :
                                                        <ShortTextIcon style={{marginRight:"10px"}} />
                                                    } 
                                            
                                                    label={<div>
                                                                <input type="text" className="text_input" style={{fontSize: "13px",width: "60px"}} placeholder="Add other" ></input>
                                                                <Button size="small" style={{textTransform: 'none', color: "#4285f4", fontSize: "13px", fontweight: "600"}} onClick={() => addOption(i)}>Add Option</Button>
                                                            </div>
                                                            } />
                                                </div>
                                            :""}
                                            {/*========================================================================================================*/}



                                            {/*===================================Footer section of question card======================================*/}                    
                                            <div className="add_footer">
                                                <div className="add_question_bottom_left">
                                                    <Button size="small" style={{textTransform: 'none', color: "#4285f4", fontsize: "13px", fontweight:"600"}} onClick={() => addAnswer(i)}>
                                                        <FcRightUp style={{border:"2px solid #4285f4", padding: "2px", marginRight: "8px"}} /> Answer key
                                                    </Button>
                                                </div>

                                                <div className="add_question_bottom">
                                                    <IconButton aria-label="Copy" onClick={() => copyQuestion(i)}>
                                                        <FilterNoneIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => deleteQuestion(i)}>
                                                        <BsTrash />
                                                    </IconButton>
                                                        <span style={{color: "#5f6368", fontSize: "13px"}}>Required </span> <Switch name="checkedA" color="primary" onClick={()=>requiredQuestion(i)} />
                                                    <IconButton>
                                                        <MorevertIcon />
                                                    </IconButton>
                                                </div>
                                            </div>
                                            {/*============================================================================================*/}
                                        </AccordionDetails>   
                                    ):(
                                        <AccordionDetails className='add_question'>
                                            {console.log("Not able to proceed frmo here")}
                                            <div className='top_header'>
                                                Choose Correct Answer
                                            </div>

                                            <div>
                                                <div className="add_question_top">
                                                    < input type="text" className="question " placeholder="Question" value={ques.questionText} disabled/>
                                                    <input type="number" className="points" min="0" step="1" placeholder="0" onChange={e=> setOptionPoints(e.target.value, i)} />
                                                </div>
                                                {/*================================================================================================================*/}
                                                {ques.option.map((op, j)=>(
                                                    <div className="add_question_body" key={j} style={{marginLeft: "8px", marginBottom: "10px",marginTop: "5px"}}>
                                                        <div key={j}>
                                                            <div style={{display: 'flex'}} className="">
                                                                <div className="form-check">
                                                                    <label style={{fontSize: "13px"}} onClick={()=>setOptionAnswer(ques.option[j].optionText, i)}>
                                                                        {(ques.questionType!="text") ?
                                                                            <input type={ques.questionType} name={ques.questionText} value="Option 3"
                                                                                className="form-check-input" required ={ques.required}
                                                                                style={{marginRight:"10px",marginBottom: "10px",marginTop: "5px"}} 
                                                                            />
                                                                        : 
                                                                            <ShortTextIcon style={{marginRight:"10px"}} />
                                                                        }
                                                                        {ques.option[j].optionText}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/*================================================================================================================*/}


                                                {/*==================================================================================================================*/}                        
                                                <div className="add_question_body">
                                                    <Button size="small" style={{textTransform: 'none', color: "#4285f4", fontSize:"13px", fontweight: "600"}}>
                                                        <BsFileText style={{fontSize: "20px",marginRight: "8px"}}/>Add Answer Feedback
                                                    </Button>
                                                </div>
                                                <div className="add_question_bottom">
                                                    <Button variant="outlined" color="primary" style={{textTransform:'none', color: "#4285f4", fontSize: "12px",marginTop: "12px", fontWeight:"200"}}
                                                        onClick={()=>doneAnswer(i)}>Done
                                                    </Button>
                                                </div>
                                                {/*====================================================================================================================*/}
                                            </div>

                                        </AccordionDetails>
                                    )}

                                    {!ques.answer ? (            
                                        <div className="question_edit">
                                            <AddCircleOutlineIcon className="edit" onClick={addMoreQuestionField} />
                                            <OndemandVideoIcon className="edit" />
                                            <CropOriginalIcon className="edit" />
                                            <TextFieldsIcon className="edit" />
                                        </div> 
                                    ):""}
                                </div>         
                            </Accordion>
                            {/*=============================closing of Accodrion============================================================================*/}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
        ))
    }

    return (
        <div>
            <div className="question_form">
                <br></br>
                <div className="section">
                    <div className="question_title_section">
                        <div className="question_form_top">
                            <input type="text" className="question_form_top_name" style={{color: "black"}} placeholder="Untitled document" onChange={e => setDocumentName(e.target.value)}></input>
                            <input type="text" className="question_form_top_desc" placeholder="Form Description" onChange={e => setDocumentDesc(e.target.value)}></input>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd} >
                        <Droppable droppableId='droppable'>
                            {(provided, snapshot) => (
                                <div {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {questionUI()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div className='save_form'>
                         <Button variant='contained' color='primary' onClick={commitToDB} style={{fontSize:"14px", marginTop:"13px"}}>Save</Button>      
                    </div>


                    
                </div>
            </div>


        </div>
    )
}

export default QuestionForm