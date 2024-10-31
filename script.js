const apiKey = "0a692fbe0badf9cea966c1248fcbdae7"
const weatherDataElement = document.querySelector(".weather-data")
const cityNameElement = document.querySelector("#city-name")
const formElement = document.querySelector("form")
const imgIcon = document.querySelector(".icon")

formElement.addEventListener("submit", (e) => {
    e.preventDefault()
    const cityValue = cityNameElement.value

    getWeatherData(cityValue)
})

async function getWeatherData(cityValue) {
    try {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            throw new Error("Network response is not ok!")
        }
        const data= await response.json()
        console.log(data)
        const temperature=Math.floor(data.main.temp)
        // console.log(temperature)
        const description=data.weather[0].description
        // console.log(description)
        const icon=data.weather[0].icon
        const name=data.name
        console.log(name)
        const country=data.sys.country

        const details=[
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
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