import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall?';
const api_key = import.meta.env.VITE_SOME_KEY;
const getWeather = (latlng) => {
    return axios.get(`${baseUrl}lat=${latlng[0]}&lon=${latlng[1]}&exclude=hourly,daily&appid=${api_key}`);
};

export default {
    getWeather: getWeather,
};
