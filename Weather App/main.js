const APIKEY = '0dac6c8cdee5ce567a419835fb6d5e22'
const url = (city, apikey) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

const form = document.getElementById('form')
const main = document.getElementById('main')
const search = document.getElementById('search')

const cityNotFound = 404

const getWeatherByCity = async (city, apikey) => {
    const response = await fetch(url(city, apikey))
    if (response.status === cityNotFound) {
        Toastify({
            text: 'La ciudad no fue encontrada!',
            duration: 3000,
            style: {
                background: '#25282A'
            }
        }).showToast()
    }
    const data = await response.json()
    showWeather(data)
}

const showWeather = (data) => {
    const temp = getCelsius(data.main.temp)
    const div = document.createElement('div')
    div.classList.add('weather')

    div.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
        </h2>
        <small>${data.weather[0].main}</small>
    `;

    //Limpiamos el contenedor
    main.innerHTML = ''

    main.appendChild(div)
};

// Convertimos grados kelvin a grados celsius
const getCelsius = (Kelvin) => {
    return Math.floor(Kelvin - 273.15)
}

form.addEventListener('submit',(e) =>{
    e.preventDefault()

    const city = search.value
    if(city){
        getWeatherByCity(city, APIKEY)
    }
});
