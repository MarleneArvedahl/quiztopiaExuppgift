import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import router from './router/router.js'



function App() {
  
  return (
    <>
      <header>
        <h1>Quiztopia</h1>
      </header>
      <RouterProvider router={ router } />
    </>
  )
}


export default App
