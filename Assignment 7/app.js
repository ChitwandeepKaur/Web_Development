const form = document.querySelector('form'); 
const temp = document.querySelector('.temp');
const t_minmax = document.querySelector('.t_minmax');
const loc = document.querySelector('.loc');
const type = document.querySelector('.type');
const humanDate = document.querySelector('.date');
const humid = document.querySelector('.humid');
const pressure = document.querySelector('.pressure');


function getWeather(city){
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0844b6ef986902c0d45c3a71041ef58f&units=metric`)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    console.dir(data);
    const tempData = data.main.temp;
    const mintemp = data.main.temp_min;
    const maxtemp = data.main.temp_max;
    const place = data.name;
    const country = data.sys.country;
    const w_type = data.weather[0].main;
    const w_pres = data.main.pressure;
    const w_humid = data.main.humidity;
   
    const unixDate = data.dt;
    const ms = unixDate*1000;
    const dateObject = new Date(ms);
    const day = dateObject.toLocaleString("en-US", {weekday:"long"});
    const month = dateObject.toLocaleString("en-US", {month:"long"});
    const date = dateObject.toLocaleString("en-US", {day:"numeric"});
    const hr = dateObject.toLocaleString("en-US", {hour:"numeric", minute: "numeric", hour12: true});
    
    humanDate.textContent = `${day}, ${date} ${month} ${hr}`;
    loc.textContent = `${place}, ${country}`;
    temp.textContent = `${tempData.toFixed(1)} °C`;
    t_minmax.textContent = `Hi: ${maxtemp.toFixed(1)}°C | Lo: ${mintemp.toFixed(1)}°C`;
    type.textContent = `${w_type}`;
    humid.textContent = `Humidity: ${w_humid}%`;
    pressure.textContent = `Pressure: ${w_pres} hPa`;
})

.catch((err)=>{
    alert("Invalid city name. Please try again!");
});
}


form.addEventListener('submit', (e) => {
e.preventDefault();

const city = form.elements[0].value;
getWeather(city);

form.elements[0].value="";
})
