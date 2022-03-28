import {Routes, Route} from 'react-router-dom'

import Login from './components/accounts/Login'
import CreateAccount from './components/accounts/CreateAccount';
import MainPage from './components/mainpage/MainPage'
import ItemPage from './components/ItemPage/ItemPage'
import ResetPassword from './components/accounts/ResetPassword'
import Profile from './components/accounts/Profile';
import OtherProfile from './components/accounts/OtherProfile';

import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path={'/'} element={<Login/>}/>
      <Route exact path={'create-account'} element={ <CreateAccount/>}/>
      <Route exact path={'reset-password'} element={ <ResetPassword/>}/>
      <Route exact path={'main-page'} element={ <MainPage/>}/>
      <Route exact path={'item-page'} element={ <ItemPage/>}/>
      <Route exact path={'profile'} element={ <Profile/>}/>
      <Route exact path={'view-seller'} element={ <OtherProfile/>}/>
    </Routes>
  );
}

export default App;
