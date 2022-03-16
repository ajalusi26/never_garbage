import {Routes, Route} from 'react-router-dom'

import Login from './components/accounts/Login'
import CreateAccount from './components/accounts/CreateAccount';
import MainPage from './components/mainpage/MainPage'

import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path={'/'} element={<Login/>}/>
      <Route exact path={'create-account'} element={ <CreateAccount/>}/>
      <Route exact path={'main-page'} element={ <MainPage/>}/>
    </Routes>
  );
}

export default App;
