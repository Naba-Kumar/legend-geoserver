import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';

// Initialize the WMS source with crossOrigin
const wmsSource = new ImageWMS({
  url: 'http://localhost:8080/geoserver/wms',
  params: { 'LAYERS': 'assam_state_dist' },
  serverType: 'geoserver',
  crossOrigin: 'anonymous', // Set crossOrigin for CORS
});

// Define the layers
const layers = [
  new TileLayer({ source: new OSM() }),
  new ImageLayer({ source: wmsSource, name: 'agis:assam_state_dist' }), // Set name for the layer
];

const map = new Map({
  layers: layers,
  target: 'map',
  view: new View({ center: [0, 0], zoom: 2 }),
});

// Function to create legend images for each layer
function createLegend(layers) {
  const legendContainer = document.getElementById('legend-container');
  legendContainer.innerHTML = ''; // Clear existing legend content

  layers.forEach(layer => {
    console.log(layer);
    
    if (layer instanceof ImageLayer && layer.getVisible()) { // Check if layer is visible
      console.log("truecheck");
      
      const layerName = layer.get('name');
      
      if (layerName) {
        const legendUrl = `http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&LAYER=${layerName}`;
        
        console.log(`Layername - ${layerName}`);
        // Create image element for the legend
        const li = document.createElement('p');


        const img = document.createElement('img');
        img.src = legendUrl;
        img.alt = `${layerName} legend`;

        const textNode = document.createTextNode(`${layerName} `);
        li.appendChild(textNode);
        li.appendChild(img);



        // Append to legend container
        legendContainer.appendChild(li);
        console.log(legendUrl);
        console.log(img);
        
      }
    }
  });
}

// Call this function whenever layers are added, removed, or visibility changes
// map.getLayers().on('change', () => {
  createLegend(map.getLayers().getArray());
// });

// HTML structure for legend container
// <div id="legend-container" style="position: absolute; bottom: 10px; right: 10px; background: white; padding: 10px;"></div>
