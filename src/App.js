import logo from './logo.svg';
import React, {useReducer, useState} from 'react';
import Header from './components/Header';
import Template from './components/Template';
import MainBody from './components/MainBody';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Formheader from './components/Formheader';
import CenteredTabs from './components/CenteredTabs';
import QuestionForm from './components/QuestionForm';
import Userform from './components/Userform';

export const initialState = {"document_name":"Untitled Document",
                            "doc_desc":"Add Description",
                            "questions":[{"questionText":"Question...",
                                          "questionType":"radio",
                                          "option":[{"optionText":"Options..."},
                                                    {"optionText":"Options..."}],
                                          "answer":false,
                                          "answerKey":"",
                                          "points":0,
                                          "open":true,
                                          "required":false
                                        }]
                            };
  


export const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  CHANGE_TYPE: "CHANGE_TYPE",
  SET_DOC_NAME: "SET_DOC_NAME", 
  SET_DOC_DESC: "SET_DOC_DESC"
}



const reducer = (state, action) => {

  switch(action.type){
    case actionTypes.SET_QUESTION:
        console.log('value updating questions');
        console.log(action.questions)
        return {
            ...state, questions:action.questions
        };
    case actionTypes.SET_DOC_NAME :
        return {
            ...state, document_name:action.doc_name,
        };
    case actionTypes.SET_DOC_DESC:
        return {
          ...state, doc_desc:action.doc_desc
        }
    default:{
        return state;
    }
    
  }
  
  
}

export const StateContext = React.createContext();

function App() {
  const [state,stateDispatch] = useReducer(reducer, initialState)

  return (
    <div className="App"> 
      <StateContext.Provider value={{State:state, dispatch:stateDispatch}} >
      <BrowserRouter>
      <Routes>
        <Route path='/form/:id?' element={<><Formheader/><CenteredTabs/><QuestionForm/></>} />
        <Route path='/response' element={ <Userform/>} />
        <Route path='/' element={<><Header/><Template/><MainBody/></>}/>
      </Routes>
      </BrowserRouter>
      </StateContext.Provider>
    </div>
  
  )
}

export default App;
