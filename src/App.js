import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import Template from './components/Template';
import MainBody from './components/MainBody';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Formheader from './components/Formheader';
import CenteredTabs from './components/CenteredTabs';
import QuestionForm from './components/QuestionForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/form/:id?' element={<><Formheader/><CenteredTabs/><QuestionForm/></>} />
        <Route path='/' element={<><Header/><Template/><MainBody/></>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
