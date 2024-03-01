import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import EditClient from './pages/client/editClient'
import Home from './pages/home'
import ListClient from './pages/client/listClient'
import NewClient from './pages/client/newClient'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/"}
            element={<Home />}
          />

          <Route
            path="/client/edit/:id"
            element={<EditClient />}
          />
          <Route
            path="/client/list"
            element={<ListClient/>}
          />
          <Route
            path="/client/new"
            element={<NewClient/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
