navigator.geolocation.getCurrentPosition(
    function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        Init(latitude, longitude);
    }
);

function Init(latitude, longitude) {
    const CurentPosition = [longitude, latitude]
    const Kiev = [30.523132, 50.449279];
}