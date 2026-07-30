import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from "./components/Login";
import Signup from './components/Signup';
import MyResultPage from './pages/MyResultPage';
// Private  protected routed
function RequireAuth({children}) {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to = '/login' state={{from:location}} replace/>; 
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
      path='/result'
      element={
        <RequireAuth>
          <MyResultPage/>
        </RequireAuth>
      } 
      >

      </Route>
    </Routes>
  )
}
