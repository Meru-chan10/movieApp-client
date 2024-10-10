//  Deoendencies packages
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Error from './pages/Error'
import Movies from './pages/Movies'
import AddMovie from './pages/AddMovie'
import MovieView from './pages/MovieView';


export default function App() {
  
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  })

  function unsetUser(){
    localStorage.clear()
  }

  useEffect(() => {
    fetch(`https://movieapp-api-lms1.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data.auth !== "Failed")
      if (data.auth !== "Failed") {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin
        });

      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, []) 

  useEffect(()=> {
    console.log(user);
    console.log(localStorage);
  }, [user])


  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser}}>
        <Router>
          <AppNavbar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/logout" element={<Logout />}/>
              <Route path="/movies" element={<Movies />}/>
              <Route path="/addMovie" element={<AddMovie />}/>
              <Route path="/movie/:movieId" element={<MovieView />}/>
              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
        </Router> 
      </UserProvider>
    </>
);
  

}


