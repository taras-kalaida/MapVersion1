
function StartMap(){
        let map = L.map('map',{
            maxZoom:20,//16
            minZoom:2//10
        }).setView([0, 0], 2);//16

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        return map;
    }
    let map = StartMap();
//GetPosition();
AddMarkerAround();

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
function AddMarkerAround(){
    for (let i of JSON.parse(arr)){
        let title ="" + i.fields.title;
        let lat =  i.fields.latitude;
        let long =  i.fields.longtitude;
        let description = i.fields.description;
        let image ="media/" + i.fields.image;
        let wiki = i.fields.wiki;
        let icon ="media/" + i.fields.icon;
        console.log(icon);

        var myIcon = L.icon({
        iconUrl: `${icon}`,
        iconSize: [50, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
        });

        let mark1 = L.marker([lat, long], {
        icon: myIcon,
        }).addTo(map).bindPopup(`<h1>${title}</h1><br>${description}<br>Sours:<a href=${wiki}>link</a><img style='height: 200px;width: 300px' src=${image}> `)

    }
}