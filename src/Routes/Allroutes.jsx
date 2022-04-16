import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddCity from '../Components/Add-city'
import { AddCountry } from '../Components/Add-country'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import Popup from '../Components/Popup'
const Allroutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/add-country' element={<AddCountry />} />
                <Route path='/add-city' element={<AddCity />} />
                <Route path='/edit/:id' element={<Popup />} />
                
            </Routes>
        </>
    )
}

export default Allroutes