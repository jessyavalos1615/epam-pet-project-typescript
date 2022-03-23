import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from './auth/useAuth';

import Profile from './components/Profile';
import Login from './components/Forms/LoginForm';
import PetCardContainer from './components/PetCardContainer';
import Navigation from './components/Navegation';


function App() {

  const { auth, setAuth } = useAuth();

  if (!auth) {
    return <Login setAuth={setAuth} />
  }

  return (
    <>
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path='/' element={<PetCardContainer />} />
          <Route path='/user' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
