const apiKey = "0a692fbe0badf9cea966c1248fcbdae7"
const weatherDataElement = document.querySelector(".weather-data")
const cityNameElement = document.querySelector("#city-name")
const formElement = document.querySelector("form")
const imgIcon = document.querySelector(".icon")
const errorElement = document.querySelector(".error")
const countryName = document.querySelector(".country-name")
const informationElement = document.querySelector(".information")
const countryElement = document.querySelector(".country-element")
const containerElement = document.querySelector(".container");

formElement.addEventListener("submit", (e) => {
    e.preventDefault()
    const cityValue = cityNameElement.value

    getWeatherData(cityValue)
})
formElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const cityValue = cityNameElement.value;
        getWeatherData(cityValue);
    }
})
function showLoader() {
    const loader = document.getElementById("loader");
    loader.classList.add("active");
}

function hideLoader() {
    const loader = document.getElementById("loader");
    loader.classList.remove("active");
}
containerElement.classList.add("default-theme")

countryName.addEventListener("mouseover", () => {
    if (informationElement.style.display == "flex") {
        informationElement.style.display = "none"
    } else {
        informationElement.style.display = "none"
    }
})

async function getCountryData(code) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    const data = await response.json();
    console.log(data)
    return {
        name: data[0]?.name.common || code,
        flag: data[0]?.flags?.svg || "",
        capital: data[0]?.capital || "",
        area: data[0]?.area || "",
        borders: data[0]?.borders || "",
        continents: data[0]?.continents || "",
        population: data[0]?.population || "",
        subregion: data[0]?.subregion || ""
    };
}
function updateBackground2(latitude, weatherCondition) {
    

    const currentMonth = new Date().getMonth(); 
    let season;

    if (latitude >= 0) {
        if (currentMonth <= 1 || currentMonth === 11) {
            season = "winter";
        } else if (currentMonth >= 2 && currentMonth <= 4) {
            season = "spring";
        } else if (currentMonth >= 5 && currentMonth <= 7) {
            season = "summer";
        } else {
            season = "autumn";
        }
    } else {
        if (currentMonth <= 1 || currentMonth === 11) {
            season = "summer";
        } else if (currentMonth >= 2 && currentMonth <= 4) {
            season = "autumn";
        } else if (currentMonth >= 5 && currentMonth <= 7) {
            season = "winter";
        } else {
            season = "spring";
        }
    }

    let theme = season; 
    if (weatherCondition.includes("Rain")) {
        theme = "rainy";
    } else if (weatherCondition.includes("Cloud")) {
        theme = "cloudy";
    } else if (weatherCondition.includes("Clear")) {
        theme = season; 
    }

    containerElement.classList.remove("winter", "spring", "summer", "autumn", "rainy", "cloudy","default-theme");
    containerElement.classList.add(theme);

    console.log(`Applied theme: ${theme}`);
}

const weatherBackgrounds = {
    Clear: "url('https://wallpapers.com/images/hd/clear-sky-background-szn3pq4e6b106qow.jpg')",
    Clouds: "url('https://png.pngtree.com/thumb_back/fh260/background/20230930/pngtree-a-blue-sky-above-clouds-with-clouds-image_13313410.jpg')",
    Rain: "url('https://t3.ftcdn.net/jpg/08/73/37/66/360_F_873376678_tz3v6yWOqd4m0Yt3WKQ5GdYAhoyYIkuv.jpg')",
    Snow: "url('https://i.pinimg.com/736x/20/88/6c/20886ce215a8179b115f9675af93e2aa.jpg')",
    Thunderstorm: "url('https://static.vecteezy.com/system/resources/thumbnails/026/907/456/small_2x/ai-generated-ai-generative-abstract-thunder-storm-energy-light-background-decoration-pattern-rexture-nature-flash-graphic-art-photo.jpg')",
    Drizzle: "url('https://t4.ftcdn.net/jpg/02/60/93/27/360_F_260932748_mgPiC5JfjoEywY7rguXlGcpdVxOU7QLk.jpg')",
    Mist: "url('https://plus.unsplash.com/premium_photo-1669613233557-1676c121fe73?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9nfGVufDB8fDB8fHww')",
    Haze: "url('https://img.freepik.com/free-photo/black-white-abstraction-wallpaper_95678-465.jpg')",
    Fog: "url('https://png.pngtree.com/thumb_back/fh260/background/20220612/pngtree-cloud-fog-smoke-white-fog-black-and-white-image_1413039.jpg')",
    Smoke: "url('https://images.unsplash.com/photo-1556388275-bb5585725aca?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D')",
    Dust: "url('https://png.pngtree.com/thumb_back/fh260/background/20210515/pngtree-gray-abstract-cloud-fog-gold-particles-dust-background-image_715055.jpg')",
    Sand: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiQE3Wno4iGpoZ0LhsosujAdWkivrHQ9Bnw&s')",
    Ash: "url('https://img.freepik.com/free-photo/gray-grunge-surface-wall-texture-background_1017-18216.jpg')",
    Squall: "url('https://t4.ftcdn.net/jpg/09/49/65/79/360_F_949657946_DAwkGnwAxHhzegVIxtCV19mPWtcX3OO5.jpg')",
    Tornado: "url('https://t3.ftcdn.net/jpg/07/54/07/86/360_F_754078657_BmNi51BaSR92Ecbcl7CFCtQGOQoBn3uC.jpg')",
    Default: "url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')" // Fallback background
};
function updateBackground(condition) {
    const background = weatherBackgrounds[condition] || weatherBackgrounds.Default; // Use the default if not found
    console.log("Setting background for condition:", condition, "->", background);

    document.body.style.backgroundImage = background;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat="no-repeat"
}

async function getWeatherData(cityValue) {
    try {
        showLoader();

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)
        if (!response.ok) {
            errorElement.style.display = "block"
            cityNameElement.classList.add("red")
            throw new Error("Network response is not ok!")
        }
        else {
            errorElement.style.display = "none"
            cityNameElement.classList.remove("red")
        }
        const data = await response.json()
        console.log(data)

        const condition = data.weather[0].main; 
        updateBackground(condition); 

        const testLatitude=data.coord.lat
        const weatherCondition=data.weather[0].main
        updateBackground2(testLatitude, weatherCondition);
        
        const temperature = Math.floor(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const name = data.name
        console.log(name)
        const country = data.sys.country

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

        const countryCode = data.sys.country;
        const countryData = await getCountryData(countryCode);
        weatherDataElement.querySelector(".country-name").textContent = `${countryData.name}`
        document.querySelector(".flag").innerHTML = `<img src="${countryData.flag}" alt="Flag of ${countryData.name}">`;

        const iconsMapping = {
            "Feels Like: ": "🌡️", 
            "Humidity: ": "💧",
            "Wind speed: ": "🌬️",
            "Direction: ": "🧭",
            "Air Pressure: ": "🎈",
            "Latitude: ": "📍",
            "Longitude: ": "📍",
            "Sunrise: ": "🌅",
            "Sunset: ": "🌇",
            "Timezone: ": "⏰"
        };

        const details = [
            { key: "Feels Like: ", text: `${Math.floor(data.main.feels_like)}°C` },
            { key: "Humidity: ", text: `${data.main.humidity}%` },
            { key: "Wind speed: ", text: `${data.wind.speed} m/s` },
            { key: "Direction: ", text: `${windDirection} (${windDeg}°)` },
            { key: "Air Pressure: ", text: `${data.main.pressure} hpa` },
            { key: "Latitude: ", text: `${Math.abs(latitude)}° ${latHemisphere}` },
            { key: "Longitude: ", text: `${Math.abs(longitude)}° ${lonHemisphere}` },
            { key: "Sunrise: ", text: `${sunrise}` },
            { key: "Sunset: ", text: `${sunset}` },
            { key: "Timezone: ", text: `${timezone}` }
        ];

        const informations = [
            `Capital Name: ${countryData.capital}`,
            `Area: ${countryData.area}`,
            `Borders: ${countryData.borders}`,
            `Continent: ${countryData.continents}`,
            `Population: ${countryData.population}`,
            `Subregion: ${countryData.subregion}`
        ]
        informationElement.innerHTML = informations.map((information) => {
            return `<div>${information}</div>`
        }).join("")

        weatherDataElement.querySelector(".city-name2").textContent = `${name}`
        weatherDataElement.querySelector(".temp").textContent = `${temperature}°C`
        weatherDataElement.querySelector(".desc").textContent = `${description}`

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => {
            const icon = iconsMapping[detail.key] || ""; 
            return `
                <div class="detail-item">
                    <span class="icon">${icon}</span>
                    <span class="key">${detail.key}</span>
                    <span class="text">${detail.text}</span>
                </div>
            `;
        }).join("");

        hideLoader()
        
    } catch (err) {
        weatherDataElement.querySelector(".temp").textContent = ""
        imgIcon.innerHTML = ""
        weatherDataElement.querySelector(".desc").textContent = ""
        weatherDataElement.querySelector(".details").textContent=""
        hideLoader()
    }
}

function getWindDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    return directions[index];
}