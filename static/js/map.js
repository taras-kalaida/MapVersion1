L.Circle.include({
  contains: function (latLng) {
    return this.getLatLng().distanceTo(latLng) < this.getRadius();
  }
});
let mark1,markArr=[],marker1,circle1,backToPoint=0,markerC,circleC,backToPointC;;
function StartMap(){
        let map = L.map('map',{
            maxZoom:20,//16
            minZoom:2//10
        }).setView([0, 0], 2);//16

        L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>'
        }).addTo(map);
        return map;
    }
    let map = StartMap();

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
}

function AddMarkerAround(){
    if(markArr){
        for(let i of markArr){
            (map.removeLayer(i))
        }
        markArr=[];
    }

    for (let i of JSON.parse(arr)){
        let title ="" + i.fields.title;
        let lat =  i.fields.latitude;
        let long =  i.fields.longtitude;
        let description = i.fields.description;
        let image ="media/" + i.fields.image;
        let wiki = i.fields.wiki;
        let icon ="media/" + i.fields.icon;

        var myIcon = L.icon({
        iconUrl: `${icon}`,
        iconSize: [50, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
        });

         mark1 = L.marker([lat, long], {
        icon: myIcon,
        });
        markArr.push(mark1)
        var result = (circleC.contains(mark1.getLatLng())) ? 'inside': 'outside';
        if( result=='inside'){
            mark1.addTo(map).bindPopup(`<h1>${title}</h1><br>${description}<br>Source:<a href=${wiki}>link</a><img style='height: 200px;width: 300px' src=${image}> `)
        }
    }
}
function MouseMapChek(){
        map.on('click', function(ev) {
            console.log(ev.latlng.lat);
            console.log(ev.latlng.lng);
                if(markerC){
        map.removeLayer(markerC)
    }

    if(circleC){
        map.removeLayer(circleC)
    }

      markerC = L.marker([ev.latlng.lat, ev.latlng.lng]).addTo(map)
      circleC = L.circle([ev.latlng.lat,ev.latlng.lng],{radius:500})
    let PersonPositionGrup = L.featureGroup([markerC,circleC]).addTo(map)
    if (backToPointC==0){
            map.fitBounds(PersonPositionGrup.getBounds())
            backToPointC=1;
    }
    AddMarkerAround();
    });

}



GetPosition();

MouseMapChek();
