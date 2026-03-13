import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Tasks from './components/Tasks'
import Bienvenidos from './pages/bienvenidos'
import EditTask from './components/EditTask'
import DeleteTask from './components/DeleteTask'
import TaskTablePage from './components/TaskTablePage'



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bienvenidos />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/table" element={<TaskTablePage />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
          <Route path="/tasks/delete/:id" element={<DeleteTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
