// https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
// http://alt.opentopomap.org/{z}/{x}/{y}.png
// https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
// http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpeg
// http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png
// http://otile1-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg
// http://irs.gis-lab.info/?layers=landsat&request=GetTile&z={z}&x={x}&y={y}
// http://tile.lonvia.de/hiking/{z}/{x}/{y}.png
// http://tile.lonvia.de/cycling/{z}/{x}/{y}.png
// http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png
// https://[abc].tile.thunderforest.com/landscape/{z}/{x}/{y}.png http://www.thunderforest.com/maps/landscape/
// https://[abc].tile.thunderforest.com/outdoors/{z}/{x}/{y}.png http://www.thunderforest.com/maps/outdoors/
// https://[abc].tile.thunderforest.com/transport/{z}/{x}/{y}.png
// https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png

// http://blog.thematicmapping.org/2013/06/converting-shapefiles-to-topojson.html

var map = L.map('map');

var OpenStreetMap_Mapnik = L.tileLayer('http://otile1-s.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
  attribution: '&copy; <a href="https://opentopomap.org/about">OpenTopoMap</a>'
});
OpenStreetMap_Mapnik.addTo(map);

map.setView([-34.9159, -56.16202], 14);

function azul_verde_marron(elev) {
    return elev > 70 ? '#A90201' :
           elev > 60 ? '#8E5629' :
           elev > 50 ? '#739A51' :
           elev > 40 ? '#59C879' :
           elev > 30 ? '#3EC3A1' :
           elev > 20 ? '#31BCB4' :
           elev > 10 ? '#2CB9BC' :
           elev > 4  ? '#249EC8' :
           elev <= 4 ? '#0000ff' :
                       '#FFEDA0';
}

function amarillos(elev) {
    return elev > 70 ? '#800026' :
           elev > 60 ? '#BD0026' :
           elev > 50 ? '#E31A1C' :
           elev > 40 ? '#FC4E2A' :
           elev > 30 ? '#FD8D3C' :
           elev > 20 ? '#FEB24C' :
           elev > 10 ? '#FED976' :
                       '#FFEDA0';
}

// grosor de la línea
function grosor(elev) {
    return elev == 50  ? 3 :
           elev == 100 ? 3 :
           elev == 150 ? 3 :
           elev == 200 ? 3 :
                         1;
}

// estilo punteado
function punteado(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// estilo de colores azules a marrones
function azules_a_marrones(feature) {
    return {
        weight: grosor(feature.properties.ELEV),
        opacity: 0.6,
        color: azul_verde_marron(feature.properties.ELEV)
    };
}

// estilo de colores en tonos de amarillo
function tonos_amarillos(feature) {
    return {
        weight: grosor(feature.properties.ELEV),
        opacity: 0.6,
        color: amarillos(feature.properties.ELEV)
    };
}

// var mvdo_geojson = new L.GeoJSON.AJAX("./assets/montevideo_topo.geojson", {style: azules_a_marrones});
// mvdo_geojson.addTo(map);

var canelones_geojson = new L.GeoJSON.AJAX("./assets/canelones_a2mts_5decimales.geojson", {style: azules_a_marrones});
canelones_geojson.addTo(map);

var montevideo_geojson = new L.GeoJSON.AJAX("./assets/montevideo_a2mts_5decimales.geojson", {style: azules_a_marrones});
montevideo_geojson.addTo(map);
