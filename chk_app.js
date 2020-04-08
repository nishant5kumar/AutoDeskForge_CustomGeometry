var viewer;
var options = {
    env: 'AutodeskProduction',
    //api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: function(onTokenReady) {
        var token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiZU1BODUyQ055NEQ1OXR6WVBFNjZzRmZrOFhvdGtNblAiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiJva0d6ejUxQUJTejZ6TWF2SFlQQTk2eGtIdVVXRkZNd3BYWHVXQzRsUzhvemdManBLS3dnOTFRZFFmTnI2S0FWIiwiZXhwIjoxNTg2MzA4OTczfQ.d5mp7QYb7ncZN6oWJ-L6e6VVWKGjKtenKwM9P9eee34';
        var timeInSeconds = 3600; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    }
};

Autodesk.Viewing.Initializer(options, function() {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log('Initialization complete, loading a model next...');

});
var htmlDiv = document.getElementById('forgeViewer');
viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv, {});

//Manifest ----------------

var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bmlzaGFudF90ZXN0Ml8yMDIwXzA0XzMvZ2F0ZWhvdXNlLm53ZA';
Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

function onDocumentLoadSuccess(viewerDocument) {
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);
}

function onDocumentLoadFailure() {
    console.error('Failed fetching Forge manifest');
}

//Create Custom Geometry

var geom = new THREE.SphereGeometry(10, 8, 8);
var material = new THREE.MeshBasicMaterial({ color: 0x336699 });
var sphereMesh = new THREE.Mesh(geom, material);
//sphereMesh1.position.set(11, 10, 30);
sphereMesh.position.x = 1.0; sphereMesh.position.y = 2.0; sphereMesh.position.z = 3.0;

//Create Overlay scene

if (!viewer.overlays.hasScene('my_scene')) {
    viewer.overlays.addScene('my_scene');
}

//Adding geometry to custom Overlay
viewer.overlays.addMesh([sphereMesh], 'my_scene');
