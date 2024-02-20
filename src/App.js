import logo from './logo.svg';
// import './App.css';
import Header from './components/Header';
import Template from './components/Template';
import MainBody from './components/MainBody';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Formheader from './components/Formheader';
import CenteredTabs from './components/CenteredTabs';
import QuestionForm from './components/QuestionForm';
import { StateProvider } from './redux/StateProvider';
import reducer, {initialstate} from './redux/reducer';



function App() {
  return (
    <div className="App"> 
      <StateProvider initialstate={initialstate} reducer={reducer}>
      <BrowserRouter>
      <Routes>
        <Route path='/form/:id?' element={<><Formheader/><CenteredTabs/><QuestionForm/></>} />
        <Route path='/' element={<><Header/><Template/><MainBody/></>}/>
      </Routes>
      </BrowserRouter>
      </StateProvider>
    </div>
  );
}

export default App;
