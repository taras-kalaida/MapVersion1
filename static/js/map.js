
function StartMap(){
        let map = L.map('map').setView([50.449279, 30.523132], 18);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        console.log(map)
        return map;
    }
    let map = StartMap();
    console.log(map)
GetPosition();


function GetPosition(){
    if(!navigator.geolocation){
        alert("Your browser dosent support geolocation")
    }else{
        navigator.geolocation.getCurrentPosition(CurrentPositionOnMap)
        setInterval(()=>{
             navigator.geolocation.getCurrentPosition(CurrentPositionOnMap)
        },5000);
    }
}
let marker1,circle1;
function CurrentPositionOnMap(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let accuracy = position.coords.accuracy;


      marker1 = L.marker([lat, long])
      circle1 = L.circle([lat,long],{radius:accuracy})
    let PersonPositionGrup = L.featureGroup([marker1,circle1]).addTo(map)
    map.fitBounds(PersonPositionGrup.getBounds())
     console.log(lat, long)
}
