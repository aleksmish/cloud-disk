import {useDispatch, useSelector} from 'react-redux'
import Navbar from './Navbar';
import '../styles/app.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Registration from './Registration';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from '../http/userApi';
import Disk from './Disk';
import Profile from './Profile';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
        <div className="App">
          <Navbar />
              {isAuth ?
              <Routes>
                <Route path="/" element={<Disk/>} exact/>
                <Route path="/profile" element={<Profile/>} exact/>
                <Route path="*" element={<Navigate replace to = "/"/>}/>
              </Routes>
              :
              <Routes>
                <Route path="/login" element={<Login/>} exact/>
                <Route path="/registration" element={<Registration/>} exact/>
                <Route path="*" element={<Navigate replace to = {"/registration"} />} />
              </Routes>
              }
        </div>
    </BrowserRouter>
  );
}

export default App;
