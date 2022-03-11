import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAuth from './auth/useAuth';

import Login from './components/Forms/LoginForm/index';
import PetCardContainer from './components/PetCardContainer/index';

function App() {

  const { auth, setAuth } = useAuth();

  if (!auth) {
    return <Login setAuth={setAuth} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PetCardContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
