import * as map from "./map.js";
import * as ajax from "./ajax.js";

let poi;

const loadPOI = () => {
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

    // callback function for when data shows up
    const poiLoaded = (jsonString) => {
        poi = JSON.parse(jsonString);
        console.log(poi);

        // make markers and add them to map
        for (let p of poi){
            map.addMarker(p.coordinates, p.title, "A POI!", "poi")
        }
    }

    ajax.downloadFile(url, poiLoaded);
}

function setupUI(){
    // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    // rit zoom
    btn1.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatRIT);
    }

    // rit iso view
    btn2.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(45, 0);
        map.flyTo(lnglatRIT);
    }

    // world zoom
    btn3.onclick = () => {
        map.setZoomLevel();
        map.setPitchAndBearing(0, 0);
        map.flyTo();
    }

    // igm zoom
    btn4.onclick = () => {
        map.setZoomLevel(18);
        map.setPitchAndBearing(0, 0);
        map.flyTo(lnglatIGM);
    }

    // load marker data
    btn5.onclick = () => {
        // only download data once
        if (!poi){
            loadPOI();
        }
    }
}

function init(){
    
    // initialize map
    map.initMap();
    setupUI();
    map.loadMarkers();
    map.addMarkersToMap();
}

export {init};