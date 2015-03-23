'use strict';

(function (Cesium) {

	var viewer = new Cesium.Viewer('cesiumContainer', {
		//baseLayerPicker: true
		animation: false,
		timeline: false,
	});

	var scene = viewer.scene;

	function initTerrain() {
		var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
			url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
			credit: ''
		});

		scene.terrainProvider = cesiumTerrainProviderMeshes;

		viewer.scene.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(5.338519, 60.394673, 1000000.0),
			duration: 15
		});
	}

	function initLayer() {
		var provider = new Cesium.TileMapServiceImageryProvider({
			url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}#',
			maximumLevel: 18,
			fileExtension: '',
			credit: new Cesium.Credit("CC-BY Kartverket", "", "http://www.kartverket.no/")
		});

		provider.requestImage = function (x, y, level) {
			var url = this._url
				.replace('{x}', x)
				.replace('{y}', y)
				.replace('{z}', level);
			console.log(url);

			return Cesium.ImageryProvider.loadImage(this, url);
		};

		viewer.scene.imageryLayers.addImageryProvider(provider);
	}

	initTerrain();
	initLayer();

})(Cesium);