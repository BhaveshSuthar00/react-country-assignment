import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {v4 as uuid} from 'uuid'
import { ContainerCountry } from './Add-country'
const AddCity = () => {
  const [country, setCountry] = useState({});
  const [successStatus, setStatus] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3004/city', {...country, id: uuid()}).then(()=> setStatus(true));
  }
  const handleChange = (e) => {
    const {id, value} = e.target;
    console.log(id, value);
    setCountry({
      ...country, [id] : value
    })
  }
  useEffect(()=>{
    if(successStatus){
      setTimeout(() => {
        setStatus(false) 
        document.getElementById('country').value = null;
        document.getElementById('city').value = null;
        document.getElementById('population').value = null;
        
      }, 1000);
    }
    else return;

  }, [successStatus])
  const [countryList, setCountryList] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3004/country').then((res)=> setCountryList(res.data)).catch((err)=> console.log(err.message))
  }, [])
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
            <p>Select Country</p>
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
            <p>Enter City</p>
            <input id="city" type="text" required={true} placeholder="Enter City" onChange={(e)=> handleChange(e)} />
            <p>Enter Population</p>
            <input id="population" type="number" required={true} placeholder="Enter Population" onChange={(e)=> handleChange(e)} />
            <br />
            <br />
            <input type="submit" id='submit' value='Add City'/>
          </form>
      </ContainerCountry>
    </div>
  )
}

export default AddCity