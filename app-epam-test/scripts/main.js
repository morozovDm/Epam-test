const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

function createDayComponent(day) {
    const today = new Date();
    let date = new Date(day.date);
    let li = '<li class="day">';
    if (date.toLocaleDateString() === today.toLocaleDateString()) {
        li += `<div>Сегодня</div>`
    }
    else {
        li += `<div>${weekday[date.getDay()]}</div>`;
    }
    li += `<h2>${date.getDate()} ${month[date.getMonth()]}</h2>`;
    li += `<img alt='weather' src=${`./resources/svg/${day.cloudiness}.svg`}></img>`;
    li += `<h2>днем ${day.temperature.day > 0 ? `+${day.temperature.day}` : day.temperature.day} &#176</h2>`;
    li += `<div class ='lowerText'>ночью ${day.temperature.night > 0 ? `+${day.temperature.night}` : day.temperature.night} &#176</div>`;
    li += `<div class ='lowerText'>${day.cloudiness} </div>`
    li += '</li>';
    return li;
}

function createWeatherViewerComponent() {
    let ul = document.getElementById('weatherView');
    for (let i = 0; i < model.length; i++) {
        let li = createDayComponent(model[i]);
        if (li !== undefined) {
            ul.innerHTML += li;
        }
    }
}

function sortModel() {
    model.sort((a, b) => {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
    })
}


function prev() {
    var carousel = document.querySelector('ul');
    let prevMargin = parseInt(window.getComputedStyle(carousel).marginLeft, 10);
    if (prevMargin < -177) {
        carousel.style.marginLeft = (prevMargin + 177) + 'px'
    }
    else {
        carousel.style.marginLeft = '0px'
    }
}

function next() {
    var carousel = document.querySelector('ul');
    let prevMargin = parseInt(window.getComputedStyle(carousel).marginLeft, 10);
    let list = document.getElementsByClassName('day');
    if (prevMargin > -177 * (list.length - 4)) {
        carousel.style.marginLeft = (prevMargin - 177) + 'px';
    }
    else {
        carousel.style.marginLeft = -177 * (list.length - 4) + 'px';
    }
}

function showTodayWeather() {
    let daysList = document.getElementsByClassName('day');
    var carousel = document.querySelector('ul');
    let count = 0;
    for (let day of daysList) {
        if (day.firstChild.innerHTML !== "Сегодня") {
            count++;
        }
        else {
            carousel.style.marginLeft = -176 * count + 'px';
            return;
        }
    }
}

window.onload = () => {
    sortModel();
    createWeatherViewerComponent();
    showTodayWeather();
}