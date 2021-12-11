// navigator.geolocation.getCurrentPosition(
//     function(position) {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;
//         Init(latitude,longitude);
//     }
// );
// function Init(latitude,longitude){
//     const CurentPosition = [longitude,latitude]
//     const Kiev = [30.523132, 50.449279];
//     const Test = [32.992226, 50.0175086];
//     var map = new ol.Map({
//         target: 'map',
//         layers: [
//           new ol.layer.Tile({
//             source: new ol.source.OSM()
//           })
//         ],
//         view: new ol.View({
//           center: ol.proj.fromLonLat(CurentPosition),
//         //    maxZoom: 20,
//         //    minZoom: 18,
//           zoom: 18
//         })
//       });
//     var layer = new ol.layer.Vector({
//         source: new ol.source.Vector({
//             features: [
//                 new ol.Feature({
//                     geometry: new ol.geom.Point(ol.proj.fromLonLat(Kiev))
//                 })
//             ]
//         })
//     });
//
//     map.addLayer(layer);
//     var container = document.getElementById('popup');
//     var content = document.getElementById('popup-content');
//     var closer = document.getElementById('popup-closer');
//
//     var overlay = new ol.Overlay({
//         element: container,
//         autoPan: true,
//         autoPanAnimation: {
//             duration: 250
//         }
//     });
//     map.addOverlay(overlay);
//
//     closer.onclick = function() {
//         overlay.setPosition(undefined);
//         closer.blur();
//         return false;
//     };
//     map.on('singleclick', function (event) {
//         if (map.hasFeatureAtPixel(event.pixel) === true) {
//             var coordinate = event.coordinate;
//
//             content.innerHTML = '<b>Hello world!</b><br />I am a popup.';
//             overlay.setPosition(coordinate);
//         } else {
//             overlay.setPosition(undefined);
//             closer.blur();
//         }
//     });
//
// }
import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';
import {Modify} from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

const iconFeature = new Feature({
  geometry: new Point([50, 30]),
  name: 'Null Island',
  population: 4000,
  rainfall: 500,
});

const iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'img/logo.png',
  }),
});

iconFeature.setStyle(iconStyle);

const vectorSource = new VectorSource({
  features: [iconFeature],
});

const vectorLayer = new VectorLayer({
  source: vectorSource,
});

const rasterLayer = new TileLayer({
  source: new TileJSON({
    url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
    crossOrigin: '',
  }),
});

const target = document.getElementById('map');
const map = new Map({
  layers: [rasterLayer, vectorLayer],
  target: target,
  view: new View({
    center: [0, 0],
    zoom: 3,
  }),
});

const modify = new Modify({
  hitDetection: vectorLayer,
  source: vectorSource,
});
modify.on(['modifystart', 'modifyend'], function (evt) {
  target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
});
const overlaySource = modify.getOverlay().getSource();
overlaySource.on(['addfeature', 'removefeature'], function (evt) {
  target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
});

map.addInteraction(modify);