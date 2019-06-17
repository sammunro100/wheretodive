import { DiveSiteInfoService } from './../_services/dive-site-info.service';
import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import Circle from 'ol/geom/circle';
import Feature from 'ol/feature';
import CircleStyle from 'ol/style/circle';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Style from 'ol/style/style';
import Overlay from 'ol/Overlay';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: any;
  vectorLayer = new VectorLayer({
    source: new VectorSource({}),
  });
  style = new Style({
    fill: new Fill({
      color: 'white'
    }),
    stroke: new Stroke({
      color: 'black',
      width: 4,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: 'red'
      }),
      stroke: new Stroke({
        width: 2
      })
    }),
  });
  featureOnHover: any;
  popupElements = document.getElementById('popup');
  featureCoords = [
    {
      coords: [-997961.8412912614, 7260906.190865462],
      name: 'Kermit The Frog'
    },
    {
      coords: [-1153281.8827667392, 7059723.932418878],
      name: 'Fozzie Bear'
    },
    {
      coords: [-1078679.3431604072, 6694049.189102596],
      name: 'Gonzo'
    },
    {
      coords: [-550346.6036532694, 6622504.130627669],
      name: 'Scooter'
    },
    {
      coords: [-506318.8753610074, 6490420.945750885],
      name: 'Telly Monster'
    },
    {
      coords: [-215246.67165105627, 6534448.674043147],
      name: 'The Swedish Chef'
    },
    {
      coords: [12229.9245256281, 6561354.50799953],
      name: 'Beaker'
    },
    {
      coords: [141867.1244972872, 6710559.587212195],
      name: 'Dr. Bunsen Honeydew'
    },
    {
      coords: [61149.62262814096, 7011415.730542649],
      name: 'Rowlf The Dog'
    },
    {
      coords: [9783.939620502526, 7148390.885229684],
      name: 'Rizzo The Rat'
    },
    {
      coords: [-134529.16978191026, 7346515.66254486],
      name: 'Miss Piggy'
    },
    {
      coords: [-259274.39994331775, 7615574.00210868],
      name: 'Sam The Eagle'
    },
    {
      coords: [-388911.59991497686, 7943335.979395515],
      name: 'Floyd Pepper'
    },
    {
      coords: [-635956.0753326665, 8058297.26993642],
      name: 'Dr. Teeth'
    },
    {
      coords: [-765593.2753043254, 7610682.032298428],
      name: 'Sweetums'
    }
  ]

  constructor(
    private readonly diveSiteInfoService: DiveSiteInfoService
  ) { }

  ngOnInit() {
    this.setupMap();
    this.plotDiveSites();
    this.addClick();
  }

  setupMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.vectorLayer
      ],
      view: new View({
        center: [-600000, 7300000],
        zoom: 6
      })
    });
  }

  addClick(){
    let self = this;
    this.map.on("click", function (e) {
      self.map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        self.diveSiteInfoService.setDiveSiteInfo(feature.values_.name);
      })
    });
  }
  
  plotDiveSites() {
    this.featureCoords.forEach((ele) => {
      const feature = new Feature(
        new Circle(ele.coords)
      )
      feature.setStyle(this.style);
      feature.getGeometry().setRadius(10000);
      feature.set('name', ele.name);
      this.vectorLayer.getSource().addFeature(feature);
    })
  }
}


    // this.map.on('click', function (evt) {
    //   /* // you want to detect feature click
    //   var feature = theMap.forEachFeatureAtPixel(evt.pixel,
    //       function(feature, layer) {
    //         return feature;
    //       });
    //   if (feature) {
    //     var fname = feature.getProperties().name;
    //     console.info("feature clicked:" + fname);
    //     return;
    //   }
    //   */
    //   console.info(evt.coordinate);
    //   console.info(Projection.toLonLat(evt.coordinate)); //   <=== coordinate projection
    // });

    // plotCircles() {
    //   const feature: any = new Feature(
    //     new Circle([-997961.8412912614, 7260906.190865462])
    //   );
    //   const features = []
    //   feature.setStyle(this.style);
    //   feature.getGeometry().setRadius(10000);
    //   this.vectorLayer.getSource().addFeature(feature);
    // }

    // addMapEventTriggers() {
    //   let self = this;
    //   // Sets up the click event to pass the relevant data into the name service which is then used by the dive info components
    //   // Triggers the popup event when on a feature
    //   this.map.on('pointermove', function (evt) {
    //     this.feature_onHover = self.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    //       return feature;
    //     });
    //     if (this.feature_onHover) {
    //       self.popupElements.setAttribute('class', 'showPopup');
    //       var popup = new Overlay({
    //         element: self.popupElements
    //       });
    //       popup.setPosition(evt.coordinate);
    //       self.map.addOverlay(popup)
    //     } 
    //     else {
    //       self.popupElements.setAttribute('class', 'hidePopup');
    //     }
    //   });
    // }