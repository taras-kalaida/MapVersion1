var map = L.map('map').setView([50.449279, 30.523132], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([50.449279, 30.523132]).addTo(map)
    .bindPopup('Test Marker.<br> AAAA')
    .openPopup();

// navigator.geolocation.getCurrentPosition(
//     function (position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//         Init(latitude, longitude);
//     }
// );
//
// function Init(latitude, longitude) {
//     const CurentPosition = [longitude, latitude]
//     const Kiev = [30.523132, 50.449279];
// }