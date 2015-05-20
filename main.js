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
			url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles',
			//url: '//assets.agi.com/stk-terrain/world',
			credit: '',
			requestWaterMask: true,
		});
		scene.terrainProvider = cesiumTerrainProviderMeshes;
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

})(Cesium);