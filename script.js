const apiKey = "0a692fbe0badf9cea966c1248fcbdae7"
const weatherDataElement = document.querySelector(".weather-data")
const cityNameElement = document.querySelector("#city-name")
const formElement = document.querySelector("form")
const imgIcon = document.querySelector(".icon")
const errorElement=document.querySelector(".error")


formElement.addEventListener("submit", (e) => {
    e.preventDefault()
    const cityValue = cityNameElement.value

    getWeatherData(cityValue)
})
formElement.addEventListener("keypress", function(enter){
    e.preventDefault()
    const cityValue = cityNameElement.value

    getWeatherData(cityValue)
})

async function getWeatherData(cityValue) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            errorElement.style.display="block"
            cityNameElement.classList.add("red")
            throw new Error("Network response is not ok!")
        }
        else{
            errorElement.style.display="none"
            cityNameElement.classList.remove("red")
        }
        const data= await response.json()
        console.log(data)
        const temperature=Math.floor(data.main.temp)
        const description=data.weather[0].description
        const icon=data.weather[0].icon
        const name=data.name
        console.log(name)
        const country=data.sys.country

        const latitude = data.coord.lat;
        const longitude = data.coord.lon;

        const latHemisphere = latitude >= 0 ? 'N' : 'S';
        const lonHemisphere = longitude >= 0 ? 'E' : 'W';

        const windSpeed = data.wind.speed;
        const windDeg = data.wind.deg;
        const windDirection = getWindDirection(windDeg);

        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

        const timezoneOffset = data.timezone / 3600;
        const timezone = `UTC ${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;

        const details=[
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
            `Direction: ${windDirection} (${windDeg}°)`,
            `Air Pressure: ${data.main.pressure} hpa`,
            `Latitude: ${Math.abs(latitude)}° ${latHemisphere}`,
            `Longitude: ${Math.abs(longitude)}° ${lonHemisphere}`,
            `Sunrise: ${sunrise}`,
            `Sunset: ${sunset}`,
            `Timezone: ${timezone}`
        ]

        weatherDataElement.querySelector(".city-name2").textContent=`${name}`
        weatherDataElement.querySelector(".country-name").textContent=`${country}`
        weatherDataElement.querySelector(".temp").textContent=`${temperature}°C`
        weatherDataElement.querySelector(".desc").textContent=`${description}`

        imgIcon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataElement.querySelector(".details").innerHTML=details.map((detail)=>{
            return `<div>${detail}</div>`
        }).join("")
    }catch(err){
        weatherDataElement.querySelector(".temp").textContent=""
        imgIcon.innerHTML=""
        weatherDataElement.querySelector(".desc").textContent=""
    }

}
function getWindDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    return directions[index];
}