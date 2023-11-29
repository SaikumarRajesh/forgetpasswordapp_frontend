import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Register from './pages/Register';


import Login from './pages/Login';
import Password from './pages/password';

function App() {
return(
    <BrowserRouter>
    <Routes>
      <Route>
      <Route index path='/' element={<Login />} />
      <Route  path='/register' element={<Register />} />
      <Route  path='/password' element={<Password />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
  }

export default App;
