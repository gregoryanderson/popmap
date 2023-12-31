import "./App.css";
import { useEffect } from "react";
import Map from "https://js.arcgis.com/4.22/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.22/@arcgis/core/views/MapView.js";
import FeatureLayer from "https://js.arcgis.com/4.22/@arcgis/core/layers/FeatureLayer.js";
import BasemapToggle from "https://js.arcgis.com/4.22/@arcgis/core/widgets/BasemapToggle.js"

function Mapping() {
  useEffect(() => {
    const myMap = new Map({ basemap: "topo-vector" });
    const myView = new MapView({ map: myMap, container: "MapApp" });

    let myBasemapToggle = new BasemapToggle({
        view: myView,
        nextBasemap: "hybrid"
    })

    const myLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0",
      definitionExpression: "POP2000 > 1000000",
    });

    myLayer.renderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 10,
        color: "blue",
      },
    };

    myLayer.popupTemplate = {
        content: "{areaname} has {POP2000} people living in this census tract"
    }

    myView.center = [-97.324, 36.64];
    myView.zoom = 5;
    myView.ui.add(myBasemapToggle, "top-right")
    myMap.add(myLayer)
  }, []);

  return <div id="MapApp" style={{ height: "100vh" }}></div>;
}

export default Mapping;
