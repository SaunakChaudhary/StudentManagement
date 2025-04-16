import React from 'react'
import Student from './Pages/Student'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Student />} />
    </Routes>
  )
}

export default App
