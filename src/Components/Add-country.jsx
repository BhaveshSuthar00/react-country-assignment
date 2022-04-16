import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
const ContainerCountry = styled.div`
  width : 100%;
  display : flex;
  flex-direction: column;
  margin-top : 3%;
  /* height : 250px; */
  & .success {
      height: 10%;
      font-weight : 600;
      width: 100%;
      border : 1px solid black;
      margin :  auto;
    }
  & form {
    border : 1px solid black;
    margin : auto;
    margin-top: 1%;
    transition : all 0.2s ease-in-out;
    padding : 1% 3%;
    height : 90%;
    border-radius: 20px;
    font-size : 21px;
    & .countrySelect {
      padding : 4% 2%;
      width : 100%;
      font-size : 21px;
      border-radius : 10px;
      & .option {
        font-size : 19px;
        padding : 10% 0;
        border-bottom : 1px solid black;
      }
    }
    & p {
      font-weight : bold;
    }
    & input {
      text-align: center;
      font-size : 21px;
      border-radius : 10px;
      outline : none;
      border : none;
      border : 1px solid black;
      padding : 10px;
    } 
    & #submit {
      background-color: #97fefb;
      font-size : 23px;
      color : #fffefb;
      padding : 2% 4%;
      border-radius: 20px;
      border : none;
      cursor: pointer;
      transition : transform 0.2s ease-in;
      transition: all 0.3s  ease-in-out;
      &:hover {
        background-color : #1eac7a;
        color : whitesmoke;
      }
      &:focus {
        transform : scale(0.8, 0.8);
      }
    }
  } 
`
const AddCountry = () => {
  const [country, setCountry] = useState({});
  const [successStatus, setStatus] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('https://face-database-app.herokuapp.com/country', {...country, id: uuid()}).then(()=> setStatus(true));
  }
  const handleChange = (e) => {
    const {id, value} = e.target;
    console.log(id, value);
    setCountry({
      ...country, [id] : value
    })
  }
  useEffect(()=>{
    console.log('here')
    if(successStatus){
      setTimeout(() => {
        setStatus(false) 
        document.getElementById('country').value = null;
      }, 1000);
    }
    else return;

  }, [successStatus])
  return (
    <div>
      <ContainerCountry>
          <div id='success'>
            <p>
              {
                successStatus ? "Added successfully" : null
              }
            </p>
          </div>
        <form onSubmit={(e)=> handleSubmit(e)}>
          <p>Enter Country</p>
          <input id="country" type="text" required={true} placeholder="Enter Country" onChange={(e)=> handleChange(e)} />
          <br />
          <br />
          <input type="submit" id='submit' />
        </form>
      </ContainerCountry>
    </div>
  )
}

export  {AddCountry, ContainerCountry}