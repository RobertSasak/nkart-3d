'use strict';

(function (Cesium) {

	function getProviderForNorgeskart() {
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

			return Cesium.ImageryProvider.loadImage(this, url);
		};
		return provider;
	}

	function initTerrain() {
		var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
			url: '//assets.agi.com/stk-terrain/world',
			credit: '',
			//requestWaterMask: true,
			//requestVertexNormals: true
		});
		viewer.scene.globe.enableLighting = true;
		scene.terrainProvider = cesiumTerrainProviderMeshes;
	}

	function flyTo() {
		viewer.scene.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(5.338519, 60.394673, 1000000.0),
			duration: 5
		});
	}

	// Home position
	Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(5, 60, 8, 63);

	var viewer = new Cesium.Viewer('cesiumContainer', {
		imageryProvider: getProviderForNorgeskart(),
		baseLayerPicker: false,
		animation: false,
		timeline: false,
		sceneModePicker: false,
	});

	var scene = viewer.scene;

	initTerrain();
	flyTo();

})(Cesium);