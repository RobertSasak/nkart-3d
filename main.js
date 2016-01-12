'use strict';

(function (Cesium) {

	function getProviderForNorgeskart() {
		return new Cesium.UrlTemplateImageryProvider({
			url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=norges_grunnkart&zoom={z}&x={x}&y={y}',
			credit: new Cesium.Credit("CC-BY Kartverket", "", "http://www.kartverket.no/"),
			maximumLevel: 18
		});
	}

	function initTerrain() {
		var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
			url: '//assets.agi.com/stk-terrain/world',
			credit: '',
			//requestWaterMask: true,
			//requestVertexNormals: true
		});
		return cesiumTerrainProviderMeshes;
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
		terrainProvider: initTerrain(),
		baseLayerPicker: false,
		animation: false,
		timeline: false,
		sceneModePicker: false,
	});

	viewer.scene.globe.enableLighting = true;

	initTerrain();
	flyTo();

})(Cesium);