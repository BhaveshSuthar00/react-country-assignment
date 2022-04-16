import React from 'react'
import { Link } from 'react-router-dom'
import styled  from 'styled-components'
const Navbarin = styled.div`
    width : 100%;
    border : 1px solid black;
    display : flex;
    justify-content : flex-end;
    & div {
        margin-right : 5%;
        & a{
            font-size : 21px;
            font-weight : bold;
            text-decoration: none;
            color : black;
        }
    }
    padding : 1%;
`
const Navbar = () => {
    return (
        <>
            <Navbarin>
                <div>
                    <Link to='/add-city'>City</Link>
                </div>
                <div>
                    <Link to='/add-country'>Country</Link>
                </div>
            </Navbarin>
        </>
    )
}

export default Navbar