import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddCity from '../Components/Add-city'
import AddCountry from '../Components/Add-country'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
const Allroutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/add-country' element={<AddCountry />} />
                <Route path='/add-city' element={<AddCity />} />
                
            </Routes>
        </>
    )
}

export default Allroutes