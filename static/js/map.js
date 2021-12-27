let Marker_BD, All_Marker_BD = [], User_All_Marker_BD = [], Current_Position_Marker, Current_Position_Circle,
    End_Watch_Position = 0, Click_Marker, Click_Circle, End_Watch_PositionC, Watch_all_mark = 0, geoWatch = 0,result,
    Routlng,Routlat, route;


L.Circle.include({
    contains: function (latLng) {
        return this.getLatLng().distanceTo(latLng) < this.getRadius();
    }
});

StartMap = () => {
    const map = L.map('map', {
        maxZoom: 16,
        minZoom: 12
    }).setView([50.45018113913906, 30.52439689636231], 16);

    L.tileLayer('https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>'
    }).addTo(map);
    return map;
}


GetPosition = () => {

    if (!navigator.geolocation) {
        alert("Your browser dosent support geolocation")
    } else {
        navigator.geolocation.getCurrentPosition(CurrentPositionOnMap)
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(CurrentPositionOnMap)
        }, 5000);
    }

}

CurrentPositionOnMap = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    if (!geoWatch) {
        map.removeLayer(Current_Position_Marker);
        map.removeLayer(Current_Position_Circle);
        End_Watch_Position = 0;
        return 0;
    }

    if (Current_Position_Marker) {
        map.removeLayer(Current_Position_Marker)
    }

    if (Current_Position_Circle) {
        map.removeLayer(Current_Position_Circle)
    }

    Current_Position_Marker = L.marker([lat, long])
    Current_Position_Circle = L.circle([lat, long], {radius: 500})
    const PersonPositionGrup = L.featureGroup([Current_Position_Marker, Current_Position_Circle]).addTo(map)
    console.log("1")
    if (End_Watch_Position == 0) {
        map.fitBounds(PersonPositionGrup.getBounds())
        End_Watch_Position = 1;
    }
}

AddMarkerAround = (ListMark) => {

    if (All_Marker_BD) {
        for (let i of All_Marker_BD) {
            (map.removeLayer(i))
        }
        All_Marker_BD = [];
    }
    for (let i of JSON.parse(ListMark)) {
        const title = "" + i.fields.title;
        const lat = i.fields.latitude;
        const long = i.fields.longtitude;
        const description = i.fields.description;
        const image = "media/" + i.fields.image;
        const wiki = i.fields.wiki;
        const icon = "media/" + i.fields.icon;

        const myIcon = L.icon({
            iconUrl: `${icon}`,
            iconSize: [50, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        Marker_BD = L.marker([lat, long], {
            icon: myIcon,
        });
        Marker_BD.on({
            click: function (e) {
            Routlng=long;
            Routlat=lat;
        }});
        All_Marker_BD.push(Marker_BD)
        if (Watch_all_mark) {
            result = 'inside';
        } else {
            result = (Click_Circle.contains(Marker_BD.getLatLng())) ? 'inside' : 'outside';
        }
        if (result == 'inside') {
            Marker_BD.addTo(map).bindPopup(`<h1>${title}</h1><br>${description}<br>Source:<a href=${wiki}>link</a><img style='height: 200px;width: 300px' src=${image}> <button class="trigger">Маршут</button>`)
        }
    }
}

MouseMapChek = () => {
    map.on('click', function (ev) {
        console.log(ev.latlng.lat);
        console.log(ev.latlng.lng);
        if (Click_Marker) {
            map.removeLayer(Click_Marker)
        }

        if (Click_Circle) {
            map.removeLayer(Click_Circle)
        }

        Click_Marker = L.marker([ev.latlng.lat, ev.latlng.lng]).addTo(map);
        if (!Watch_all_mark) {
            Click_Circle = L.circle([ev.latlng.lat, ev.latlng.lng], {radius: 500})


            const PersonPositionGrup = L.featureGroup([Click_Marker, Click_Circle]).addTo(map)
            if (End_Watch_PositionC == 0) {
                map.fitBounds(PersonPositionGrup.getBounds())
                End_Watch_PositionC = 1;
            }
        }
        AddMarkerAround(arr);

    });

}

ModalWindowToAddMark = () => {
    document.querySelector(".dolgota").value = Click_Marker.getLatLng().lat;
    document.querySelector(".shirota").value = Click_Marker.getLatLng().lng;
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


CreatNewMark = () => {
    result = confirm("Добавить выбраное место на карту?");
    if (result) {
        ModalWindowToAddMark();
    }


}

SeeUserMark = () => {
    for (let i of JSON.parse(arr2)) {
        const title = "" + i.fields.title;
        const lat1 = i.fields.latitude;
        const long1 = i.fields.longtitude;
        const description = i.fields.description;
        const image = "static/icon/no-image.png";
        const wiki = i.fields.wiki;
        const myIcon = L.icon({
            iconUrl: `static/icon/UserIcon.svg`,
            iconSize: [50, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
        });

        UserMark = L.marker([long1, lat1], {
            icon: myIcon,
        });
        User_All_Marker_BD.push(UserMark);
        UserMark.addTo(map).bindPopup(`<h1>${title}</h1><br>${description}<br>Source:<a href=${wiki}>link</a><img style='height: 200px;width: 300px' src=${image}>  `)

    }
}
ClearUserMark = () => {
    if (User_All_Marker_BD) {
        for (let i of User_All_Marker_BD) {
            (map.removeLayer(i))
        }
        User_All_Marker_BD = [];
    }
}

Test = () => {
    Click_Marker = L.marker([50.45018113913906, 30.52439689636231]).addTo(map);
    Click_Circle = L.circle([50.45018113913906, 30.52439689636231], {radius: 500}).addTo(map);
    AddMarkerAround(arr);

}
MapBottom = () => {

    const GeoBTN = L.easyButton({
        states: [{
            stateName: 'OnGeo',
            icon: '<img src="/static/images/footer_icons/ioc.png" style="width: 25px;height: 25px;display: block;margin:2px 0 0 3px;">',
            title: 'on geolocation',
            onClick: function (control) {
                geoWatch = 1;
                GetPosition();
                control.state('offGeo');
            }
        }, {
            icon: '<img src="/static/images/footer_icons/1.png" style="width: 25px;height: 25px;display: block;margin:2px 0 0 3px;">',
            stateName: 'offGeo',
            onClick: function (control) {
                geoWatch = 0;
                GetPosition();
                control.state('OnGeo');
            },
            title: 'off geolocation'
        }]
});
GeoBTN.addTo(map);

    const toggle = L.easyButton({
        states: [{
            stateName: 'OnAllMark',
            icon: '<span>All',
            title: 'on all mark on map',
            onClick: function (control) {
                Watch_all_mark = 1;
                if (Click_Circle) {
                    map.removeLayer(Click_Circle);
                }
                AddMarkerAround(arr);
                control.state('offAllMark');
            }
        }, {
            icon: '<span>Reg',
            stateName: 'offAllMark',
            onClick: function (control) {
                Watch_all_mark = 0;
                GetPosition();
                AddMarkerAround(arr);
                control.state('OnAllMark');
            },
            title: 'off all mark on map'
        }]
});
toggle.addTo(map);

    const removeRouteLine = L.easyButton({
        states: [{
            stateName: 'removeRouteLine',
            icon: '<img src="/static/images/footer_icons/trash.png" style="width: 25px;height: 25px;display: block;margin:2px 0 0 3px;">',
            title: 'remove Route Line',
            onClick: function (control) {
                RemoveRouteLine();
            }
        }]
    });
    removeRouteLine.addTo(map);

if(UserIndef == "True"){
    const creatNewMark = L.easyButton({
        states: [{
            stateName: 'creatNewMark',
            icon: '<span>Add',
            title: 'creat New Mark on Map',
            onClick: function (control) {
                CreatNewMark();
            }
        }]
});
creatNewMark.addTo(map);


    const seeUserMark = L.easyButton({
        states: [{
            stateName: 'seeUserMark',
            icon: '<span>UserMark',
            title: 'seeUserMark',
            onClick: function (control) {
                SeeUserMark();
                control.state('offUserMark');
            }
        }, {
            icon: '<span>OffUserMark',
            stateName: 'offUserMark',
            onClick: function (control) {
                ClearUserMark();
                control.state('seeUserMark');
            },
            title: 'offUserMark'
        }]
    });
    seeUserMark.addTo(map);

}
}

RemoveRouteLine = () => {
    route.remove(map);
}

ShowRoute = (c1,c2,c3,c4) => {
    route = L.Routing.control({
        waypoints: [
            L.latLng(c3, c4),
            L.latLng(c1, c2),
        ],
        language: 'ru',
        createMarker: function() { return null; },
        lineOptions: {
            styles: [{color: 'red', opacity: 1, weight: 5}]
        },
        draggableWaypoints: false,
        collapsible: true,
        collapseBtnClass: 'leaflet-routing-collapse-btn',
        addWaypoints: false,
        itineraryClassName: 'wayBox',
        summaryTemplate:'<h2 style="color: black; text-align: center";>{name}</h2><h3 style="color: black; text-align: center;" >{distance}, {time}</h3>',
        showAlternatives: true,
        altLineOptions: {
            styles: [{color: 'red', opacity: 0.55, weight: 5}]
        },
    }).addTo(map);
}

$('#map').on('click', '.trigger', () => {
    if(Click_Marker){
    ShowRoute(Routlat,Routlng,Click_Marker.getLatLng().lat, Click_Marker.getLatLng().lng)
    }
    if(Current_Position_Marker){
   alert("2")
    }
});

const map = StartMap();
ShowRoute();
MapBottom();
MouseMapChek();
Test()
route.remove(map);

