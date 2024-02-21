import logo from './logo.svg';
// import './App.css';
import React, {useReducer} from 'react';
import Header from './components/Header';
import Template from './components/Template';
import MainBody from './components/MainBody';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Formheader from './components/Formheader';
import CenteredTabs from './components/CenteredTabs';
import QuestionForm from './components/QuestionForm';
//import { StateProvider } from './redux/StateProvider';
//import reducer, {initialstate} from './redux/reducer';
import Userform from './components/Userform';

export const initialstate = [{"doc_name":"Untitled Document",
"doc_desc":"Add Description",
"questions":[{"questionText":"Question here",
            "questionType":"radio",
            "option":[{"optionText":"Option 1"},
                        {"optionText":"Option 2"}],
            "answer":false,
            "answerKey":"Bengaluru",
            "points":"2",
            "open":true,
            "required":false
        }]
    }]

export const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  CHANGE_TYPE: "CHANGE_TYPE",
  SET_DOC_NAME: "SET_DOC_NAME", 
  SET_DOC_DESC: "SET_DOC_DESC"
}

const reducer = (state, action) => {
  switch(action.type){
    case actionTypes.SET_QUESTION :
        console.log("setting question here",action.questions)
        return {
            ...state, questions:action.questions,
        };
    case actionTypes.CHANGE_TYPE:
        return {
            ...state, questionType:action.questionType,
        };
    case actionTypes.SET_DOC_NAME :
        return {
            ...state, doc_name:action.doc_name,
        };
    default:
        return state;
  }
}

export const StateContext = React.createContext();





function App() {
  const [state, dispatch] = useReducer(reducer, initialstate)

  return (
    <div className="App"> 
      <StateContext.Provider value={{initialstate:state, dispatch:dispatch}} >
      <BrowserRouter>
      <Routes>
        <Route path='/form/:id?' element={<><Formheader/><CenteredTabs/><QuestionForm/></>} />
        <Route path='/response' element={<Userform/>} />
        <Route path='/' element={<><Header/><Template/><MainBody/></>}/>
      </Routes>
      </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
}

export default App;
