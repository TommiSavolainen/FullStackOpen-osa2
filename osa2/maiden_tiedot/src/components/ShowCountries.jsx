import axios from 'axios';
import weatherService from '../services/weather'
import { useState, useEffect } from 'react'
const ShowCountries = (props) => {
    function clickedShow(result, setResults){
        const list = [result]
        setResults(list)
    }
    
    if(props.results.length > 10){
        return(
            <>
            <p>Too many matches, specify another filter</p>
            </>
        )
    }else if (props.results.length <=10 && props.results.length >1){
        return(
            <>
            {props.results.map(result => <p key={result}> {result} <button onClick={()=> clickedShow(result, props.setResults)}>show</button></p>)}
            </>
        )
    }else if (props.results.length == 1){
        const country = props.countries.filter(maa => maa.name.common == props.results[0])
        const languages = Object.values(country[0].languages)
        useEffect(() => {
            weatherService
              .getWeather(country[0].capitalInfo.latlng)
              .then(response => {
                setWeather(response.data)
              })
          }, [])
        // const weather = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${country[0].capitalInfo.latlng[0]}&lon=${country[0].capitalInfo.latlng[1]}&exclude=hourly,daily&appid=${props.api_key}`)
        console.log(props.weather)
        return(
            <>
                <h2>{country[0].name.common}</h2>
                <p>capital {country[0].capital}</p>
                <p>area {country[0].area}</p>
                <p><b>languages:</b></p>
                <ul>
                    {languages.map(kieli => <li key={kieli}>{kieli}</li>)}
                </ul>
                <img src={country[0].flags.png} alt={country[0].flags.png}/>
            </>
        )
    }
}

export default ShowCountries