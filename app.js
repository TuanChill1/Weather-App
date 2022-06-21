const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const inputValue = $('.search');
const btnSubmit = $('.submit');
const weekdays = $('.weekdays');
const date = $('.date');
const temp = $('.temp .value');
const visibility = $('.visibility');
const humidity = $('.humidity');
const wind = $('.wind');
const city = $('.city');
const shortDesc = $('.short-desc')
const country = $('.country');


const app = {
    changeWeatherUI: async function(capitalValue) {
        let apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue}&units=metric&appid=28fd15358cdecbc1a1dfef367e71acef`;
        let data = await fetch(apiWeather).then(res=> res.json());
        console.log(data);
        if(data.cod == 200) {
            temp.innerText = Math.round((data.main.temp));
            wind.innerText = `${data.wind.speed} m/s`;
            visibility.innerText = `${data.visibility} m`;
            city.innerText = data.name;
            country.innerText = data.sys.country;
            humidity.innerText = `${data.main.humidity} %`;
            shortDesc.innerText = data.weather[0].main;
        }
    },
    setTime: function() {
        const currentdate  = new Date();
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        Date.prototype.getMonthName = function() {
            return months[ this.getUTCMonth() ];
        };
        Date.prototype.getDayName = function() {
            return days[ this.getUTCDay() ];
        };
        const dayName = currentdate.getDayName();
        const month = currentdate.getMonthName();
        weekdays.innerText = dayName;
        date.innerHTML = `${currentdate.getDate()} ${month} ${currentdate.getFullYear()}`;
    },
    sentRequest: function() {
        this.changeWeatherUI('hanoi');
        let capitalValue;
        inputValue.onkeyup = (value) => {
            capitalValue = value.target.value.trim()
        }
        btnSubmit.addEventListener('click', ()=> {
            this.changeWeatherUI(capitalValue);
        });
        inputValue.addEventListener('keypress', (e) => {
            if(e.code == 'Enter') {
                this.changeWeatherUI(capitalValue);
            }
        })
    },
    start: function() {
        this.sentRequest();
        this.setTime();
    }
}

app.start()

