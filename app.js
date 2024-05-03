'use strict';

const apiKey = 'at_eQ0dpVcDJ4jkKcwQkzGBzS0TAwES7';
const input = document.querySelector('#input'),
    submitBtn = document.querySelector('#submit'),
    ipAddressEl = document.querySelector('.ip-address'),
    locationEl = document.querySelector('.location'),
    timezoneEl = document.querySelector('.timezone'),
    ispEl = document.querySelector('.isp'),
    mapEl = document.querySelector('#map');

let lat = 0;
let lng = 0;
let map = L.map('map').setView([51.505, -0.09], 13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function fetchData() {
    try {
        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${input.value}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const data = await response.json();
        lat = data.location.lat;
        lng = data.location.lng;
        console.log(data);
        ipAddressEl.innerHTML = data.ip;
        locationEl.innerHTML = `${data.location.country} ${data.location.region} ${data.location.city}`;
        timezoneEl.innerHTML = data.location.timezone;
        ispEl.innerHTML = data.isp;
        input.innerHTML = '';
        mapFunc(lat, lng)
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function mapFunc(lat, lng) {
    const iconImg = './images/icon-location.svg';
    var myIcon = L.icon({
        iconUrl: iconImg,
        iconSize: [46, 56],
        iconAnchor: [23, 55]
    });
    map.setView([lat, lng], 17)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: false,
    }).addTo(map)

    L.marker([lat, lng], { icon: myIcon }).addTo(map)
}

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    if (input.value.match(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    )) {
        fetchData()
    } else {
        alert('Invalid IP Address')
    }
    input.value = ''
})

