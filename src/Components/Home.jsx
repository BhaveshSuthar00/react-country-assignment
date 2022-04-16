import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components';
import {Link} from 'react-router-dom'
const Container = styled.div`
    margin-top: 1%;
    padding : 2% 0;
    &>div:last-child{
        display : flex;
        margin : auto;
        width : 90%;
        padding: 1%;
    
        &>.table {
            width: 100%;
            &>tbody>tr{
                &>td:last-child {
                    cursor: pointer;
                }
                & .tdBtn {
                    & a {
                        color : black;
                        text-decoration: none;
                    }
                }
            }
            & th, td {
                transition : all 0.2s ease-in-out;
            }
            & th:nth-child(even):hover, td:nth-child(odd):hover {
                background-color: #84f8f4;
                color : #ff4a4a;
            }
            & th:nth-child(odd):hover,td:nth-child(even):hover {
                background-color: #ffa024;
                color : #00a5f7;
            }
        }
        & table, th, td {
            font-size : 23px;
            padding : 1% 0;
            border: 1px solid black;
            border-collapse: collapse;
        }
        
    }
    &>div:first-child {
        display : flex;
        justify-content : space-evenly;
    }
`

const Home = () => {
    const [city, setCity] = useState([]);
    const [filter, setFilter] = useState(false);
    
    const [country, setCountry] = useState({});
  const [countryList, setCountryList] = useState([]);
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3004/city/${id}`).then((res)=>{
            let datahere = [];
            for(let i = 0; i<city.length;i++){
                if(city[i].id !== id){
                    datahere.push(city[i]);
                }
            }
            setCity(datahere);
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleDataHere = ()=>{
        axios.get('http://localhost:3004/city').then((res)=> setCity(res.data)).catch((err)=> console.log(err))
        return (()=>{
            setCity([])
        })
    }
    useEffect(()=>{
        handleDataHere()
    },[])
    const handleChange = (e) => {
        const { value} = e.target;
        let data = [];
        for(let i = 0; i<city.length;i++){
            if(city[i].country == value){
                data.push(city[i]);
            }
        }
        if(value == "null" || data.length == 0){
            handleDataHere()
        }
        setCity(data);
    }
    const handleSort = (eve)=>{
        const {value} = eve.target;
        console.log(value)
        let data = []
        if(value === 'asc'){
            data = city.sort((a,b) =>  (+a.population) - (+b.population) )
        } else {
            // data = city.sort((a,b)=>{
            //     return   (+b.population) - (+a.population);
            // })
            data = city.sort((a,b) =>  (+b.population) - (+a.population))
        }
        setCity(data)
        setFilter(!filter)
    }
    useEffect(()=>{}, [filter])
    useEffect(()=>{
        axios.get('http://localhost:3004/country').then((res)=> setCountryList(res.data)).catch((err)=> console.log(err.message))
    }, [])
    if(city.length <= 0){
        return <>Loading...</>
    }
    return (
        <Container>
            <div>
                <div>
                    <select className="countrySelect" name="city" id="country" onChange={(e)=> handleChange(e)} >
                        <option value="null"></option>
                        {
                            countryList.length > 0 ? countryList.map((item,index)=>{
                            return <option className='option' key={index} value={item.country}>
                                {item.country}
                            </option>
                            }) : null
                        }
                    </select>
                </div>
                <div>
                    <select id="value" onChange={(e)=>{handleSort(e)}}>
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Popuation</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            city.length > 0 && city.map((item,index)=>{
                                return (
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>{item.country}</td>
                                        <td>{item.city}</td>
                                        <td>{item.population}</td>
                                        <td className='tdBtn'><Link to={`/edit/${item.id}`}>Edit</Link></td>
                                        <td onClick={()=> handleDelete(item.id)}>Delete</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </Container>
    )
}

export default Home;