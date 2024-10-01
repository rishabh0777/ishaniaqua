import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './components/Landing'
import Signup from './components/Signup'
import Login from './components/Login'
import Admin from './components/Admin'
import Order from './components/Order'
import MyCustomers from './components/MyCustomers'
import Offer from './components/Offer'

const App = () => {
  return (
    <>
   
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Landing />} />
         <Route path='admin' element={<Admin />} />
         <Route path="my-customer" element={<MyCustomers />} />
         <Route path='order' element={<Order />} />
         <Route path='offers' element={<Offer />} />

        </Route>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />




      </Routes>
    </Router>
       
  </>
  )
}

export default App