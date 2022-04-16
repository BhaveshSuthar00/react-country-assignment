import React from 'react'
import { Link } from 'react-router-dom'
import styled  from 'styled-components'
const Navbarin = styled.div`
    width : 95%;
    border : 1px solid black;
    display : flex;
    margin : auto;
    margin-top : 5px;
    border-radius: 10px;
    justify-content : flex-end;
    padding : 1% 0;
    & div {
        margin-right : 5%;
        & a{
            font-size : 21px;
            font-weight : bold;
            text-decoration: none;
            color : black;
        }
    }
`
const Navbar = () => {
    return (
        <>
            <Navbarin>
                <div>
                    <Link to='/'>Home</Link>
                </div>
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