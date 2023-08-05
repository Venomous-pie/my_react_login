import './App.css';
import {Routes, Route} from 'react-router-dom'
import Rootlayout from './layouts/Rootlayout';
import Loginpage from './pages/Login';
import Successpage from './pages/Success';


function App() {
  return (
    <Routes>
      <Route element={<Rootlayout/>}>
        <Route path='/' element={<Loginpage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/success' element={<Successpage/>}/>
      </Route>
    </Routes>
)}

export default App;
