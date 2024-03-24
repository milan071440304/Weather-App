
// //Weather app

// const weatherContainer = document.querySelector(".weather-card-container");

// const weatherFirstNode_classLists = ["search-box", "img-wrapper", "weather-box", "forcast-detailsBox"];
// weatherFirstNode_classLists.forEach((eachClass, index) => {
//     const firstNode_divs = document.createElement("div");
//     firstNode_divs.classList.add(eachClass);
//     console.log(firstNode_divs)
//     // console.log(eachClass)
//     weatherContainer.appendChild(firstNode_divs);
// });


// const wrapperFirstNode_divs =  [["input", "button"],["img"],["div", "div"],["div", "div"]];
// wrapperFirstNode_divs.forEach((element, index) => { 
//     const wrapperFirstNodeClass = [["search-Input", "search-icon-btn"],["weather-img"],["temp-detail", "city-detail"],["hue-details-wrapper", "wind-details-wrapper"]];
//     const thirdNodeClass = wrapperFirstNodeClass[index];
//     element.forEach((item, index) => {
//         const thirdNodeElement = document.createElement(item)
//         thirdNodeElement.classList.add(thirdNodeClass[index])
//          console.log(thirdNodeElement)
//     });
// });






function appendingChild(appendArrayLists, appendNodeElement){ // Re-usal function to append Child
    appendArrayLists.forEach(lists =>{
        appendNodeElement.appendChild(lists);
    })
};


const body = document.querySelector("body");


const weatherContainer = document.createElement("div");
weatherContainer.classList.add("weather-card-container");
body.prepend(weatherContainer); 

const weatherFirstNode_classLists = ["search-box", "img-wrapper", "weather-box", "forcast-details-box"];

weatherFirstNode_classLists.forEach((eachClass, index) => {
    const firstNode_divs = document.createElement("div");
    firstNode_divs.classList.add(eachClass);
    weatherContainer.appendChild(firstNode_divs);

    const wrapperFirstNode_divs =  [["input", "button"],["img"],["div", "div"],["div", "div"]];
    const wrapperFirstNodeClass = [["search-input", "search-icon-btn"],["weather-img"],["temp-detail", "city-detail"],["hue-details-wrapper", "wind-details-wrapper"]];
    
    wrapperFirstNode_divs[index].forEach((element, innerIndex) => { 
        const thirdNodeElement = document.createElement(element);
        thirdNodeElement.classList.add(wrapperFirstNodeClass[index][innerIndex]);
        firstNode_divs.appendChild(thirdNodeElement);
    });
});

const weatherImg = document.querySelector(".weather-img");
weatherImg.src = "./weatherImg.png";

const tempDetail = document.querySelector(".temp-detail")
tempDetail.textContent = "7°C";

const cityDetail = document.querySelector(".city-detail")
cityDetail.textContent = "Kathmandu";

const searchIcon = document.createElement("img");
searchIcon.classList.add("search-icon");
searchIcon.src = "./searchIcon.png";     // insert image source as an icon

const searchIconBtn = document.querySelector(".search-icon-btn");
searchIconBtn.appendChild(searchIcon); //Append child in its node element


const hueImg = document.createElement("img");
hueImg.classList.add("hue-img");
hueImg.src = "./hueImg.png";

const huePercent = document.createElement("h5");
huePercent.classList.add("hue-percent");
huePercent.textContent = `10 %`;

const hueText = document.createElement("h5");
hueText.classList.add("hue-text");
hueText.textContent = "Humidity";

const hueDetail = document.createElement("div");
hueDetail.classList.add("hue-detail");

appendingChild([huePercent, hueText], hueDetail); // Append Child using re-usable function

const hueDetailWrapper = document.querySelector(".hue-details-wrapper");

appendingChild([hueImg, hueDetail], hueDetailWrapper); // Append Child using re-usable function

const windImg = document.createElement("img");
windImg.classList.add("wind-img");
windImg.src = "./windImg.png";

const windspeed = document.createElement("h5");
windspeed.classList.add("wind-speed");
windspeed.textContent = `7 km/hr`;

const windText = document.createElement("h5");
windText.classList.add("wind-text");
windText.textContent = "Wind Speed";

const windDetail = document.createElement("div");
windDetail.classList.add("wind-detail");

appendingChild([windspeed, windText], windDetail); // Append Child using re-usable function


const windDetailWrapper = document.querySelector(".wind-details-wrapper");
appendingChild([windImg, windDetail],windDetailWrapper); // Append Child using re-usable function



const searchInput = document.querySelector(".search-input");
// for fetching weather data from the json api
const fetchKey = "1ae829b07902ce7fc0ef816a1dacab86";
const fetchWeatherData = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city){
    const response = await fetch(`${fetchWeatherData}${city}&appid=${fetchKey}`);
    const weatherData = await response.json();

    try{
        if(!weatherData.name){throw error};
        tempDetail.textContent = `${Math.round(weatherData.main.temp)}°C`;
        cityDetail.textContent = weatherData.name;
        huePercent.textContent = `${weatherData.main.humidity}%`;
        windspeed.textContent = `${weatherData.wind.speed} km/hr`;
        const imageChanger = weatherData.weather[0].main;
        // console.log(weatherImg);
        weatherImg.src = `./images/${imageChanger}.png`;
        // console.log(weatherImg);
        // console.log(imageChanger);
    }catch(error){
        const notyf = new Notyf({
            duration: 1000,
            position: {
              x: 'center',
              y: 'top',
            },
            types: [
              {
                type: 'warning',
                background: 'orange',
                icon: {
                  className: 'material-icons',
                  tagName: 'i',
                  text: 'warning'
                }
              },
              {
                type: 'error',
                background: 'indianred',
                duration: 2000,
                dismissible: true
              }
            ]
          }
        );    
        notyf.error('Please, Enter Valid City Name');
    };
};

searchIconBtn.addEventListener("click",()=>{
    // searchIconBtn.style.boxShadow = `inset 1px -1px 5px 4px #ffffff, inset -3px 3px 7px 2px #5f5f5fb3, 2px -1px 3px 2px #ffffff, -3px 3px 3px 1px #0000004a`;
    checkWeather(searchInput.value ? searchInput.value : cityDetail.textContent);
});




