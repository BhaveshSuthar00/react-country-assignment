import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import { ContainerCountry } from './Add-country'
const Popup = () => {
    const {id} = useParams();
    const navigate = useNavigate()
  const [country, setCountry] = useState({});
  const [successStatus, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.patch(`http://localhost:3004/city/${id}`, country).then(()=> setStatus(true));
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
        navigate('/')
      }, 1000);
    }
    else return;
    return(()=>{
        setCountryList(null)
        setCountry(null)
    })
  }, [successStatus])
    useEffect(()=>{
        axios.get(`http://localhost:3004/city/${id}`).then((res) =>{
        setCountry(res.data)
        setShow(true);    
    })
    return(()=>{
        setShow(false);
    })
    },[])
  const [countryList, setCountryList] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3004/country').then((res)=> setCountryList(res.data)).catch((err)=> console.log(err.message))
  }, [])
  if(!show){
      return <>Loading....</>
  }
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
              <option value={country.country}></option>
              {
                countryList.length > 0 ? countryList.map((item,index)=>{
                  return <option className='option' key={index} value={item.country}>
                    {item.country}
                  </option>
                }) : null
              }
            </select>
            <p>Enter City</p>
            <input id="city" value={country.city} type="text" required={true} placeholder="Enter City" onChange={(e)=> handleChange(e)} />
            <p>Enter Population</p>
            <input id="population"value={country.population} type="number" required={true} placeholder="Enter Population" onChange={(e)=> handleChange(e)} />
            <br />
            <br />
            <input type="submit" id='submit' value='Add City'/>
          </form>
      </ContainerCountry>
    </div>
  )
}

export default Popup