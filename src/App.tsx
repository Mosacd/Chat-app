import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './src/Layout'
import Home from './src/pages/home'
import Chat from './src/pages/chat'

function App() {

  return (
   
    <Routes>
      <Route element={<Layout/>}>
          <Route path='/' element = {<Home/>}/>
          <Route path="chat/" element = {<Chat/>}/>
      </Route>
  
     </Routes>
  
  )
}

export default App
