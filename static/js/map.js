
function StartMap(){
        let map = L.map('map',{
            maxZoom:16,
            minZoom:10
        }).setView([0, 0], 16);

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
let marker1,circle1,backToPoint=0;
function CurrentPositionOnMap(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let accuracy = position.coords.accuracy;

    if(marker1){
        map.removeLayer(marker1)
    }

    if(circle1){
        map.removeLayer(circle1)
    }

      marker1 = L.marker([lat, long])
      circle1 = L.circle([lat,long],{radius:500})
    let PersonPositionGrup = L.featureGroup([marker1,circle1]).addTo(map)
    if (backToPoint==0){
            map.fitBounds(PersonPositionGrup.getBounds())
            backToPoint=1;
    }
     console.log(lat, long)
}
