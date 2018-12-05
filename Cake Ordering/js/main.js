
//Scene Objects - scene, camera, renderer

var scene = new THREE.Scene(); //Create scene
scene.background = new THREE.Color( "rgb( 193, 237, 233 )" ); //Change background colour rgb
var camera = new THREE.PerspectiveCamera( 65, window.innerWidth/window.innerHeight, 0.1, 1000 ); //Create camara

camera.position.x = 1; //Position camera on X axis
camera.position.y = 7; //Position camera on Y axis
camera.position.z = 10; //Position camera on Z axis

var renderer = new THREE.WebGLRenderer( { antialias: true } ); //Create renderer with antialias enabled
renderer.setSize( window.innerWidth, window.innerHeight ); //Set size of renderer in relationship to the window
document.body.appendChild( renderer.domElement ); //Append renderer as child of body

renderer.shadowMap.enabled = true; //Enable shadow maps for renderer

var controls = new THREE.OrbitControls( camera, renderer.domElement ); // Enable camera controls orbitControls.js
controls.maxPolarAngle = Math.PI * 0.4;

//*****************************************************

//Responsive Window Size
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	controls.handleResize();
	
};

//************************************************************

//Scene Lights

var amblight = new THREE.AmbientLight( 0xffffff, 0.5 ); //Add ambient light
var directlight1 = new THREE.DirectionalLight( 0xffffff, 0.2 ); //Add directional light
directlight1.castShadow = true; //Directional light to cast shadows

var directlight2 = new THREE.DirectionalLight( 0xffffff, 0.5 ); //Add directional light
directlight2.castShadow = true; //Directional light to cast shadows

var pointLight1 = new THREE.PointLight( 0xffffff, 4, 1, 2 );
pointLight1.position.y = 1.5;

scene.add( amblight, directlight1, directlight2, pointLight1 ); //Add both light to scene

directlight1.shadow.mapSize.width = 1024; //Shadow map size on width
directlight1.shadow.mapSize.height = 1024; //shadow map size on height
directlight2.shadow.mapSize.width = 1024; //Shadow map size on width
directlight2.shadow.mapSize.height = 1024; //shadow map size on height

directlight2.position.set( 2, 10, 10 ); //Set root position for light poiinting at default target (0, 0, 0)

//*****************************************************

//Scene Meshes - Cake, Floor, Text

var flavourColour = new THREE.Color( 0xffffff );
var colourTop;
var scaleY;
var heightBase = 1.5;
var heightMiddle = 3;
var heightTop = 4.5;
var positionYbase = -1;
var positionYmiddle = 1;
var positionYtop = 1;
var positionYcandle = 2.5;
var positionYcandle2 = 1;
var positionYcandle3 = -1;
var positionYflame = 0.7;
var positionYtext = 0.55;

var planeGeo = new THREE.PlaneGeometry( 15, 10, 1, 1 ); //Add plane/floor mesh
var planeMat = new THREE.MeshLambertMaterial( { color: 0xC1EDE9, transparent: true, opacity: 0.1 } ); //Add Lambert material
var plane = new THREE.Mesh( planeGeo, planeMat ); //Create mesh object

plane.receiveShadow = true; //Receive shadows
plane.rotation.x = - Math.PI / 2; //Rotate plane 90 degrees

var baseCakeGeo = new THREE.CylinderGeometry( 3.5, 3.5, heightBase, 64, 64 ); //Add base for cake mesh
var baseCakeMat = new THREE.MeshLambertMaterial( { color: 0xffffff } ); //Add material
var baseCake = new THREE.Mesh( baseCakeGeo, baseCakeMat ); //Create Mesh
baseCake.castShadow = true; //Cast shadows
baseCake.position.y = positionYbase; //Postion base on top of plane

var midLayerCakeGeo = new THREE.CylinderGeometry( 2.5, 2.5, heightMiddle, 64, 64 ); //Add middle layer for cake mesh
var midLayerCakeMat = new THREE.MeshLambertMaterial( { color: 0xffffff } ); //Add material
var midLayerCake = new THREE.Mesh( midLayerCakeGeo, midLayerCakeMat ); //Create Mesh
midLayerCake.position.y = positionYbase + positionYmiddle; //Postion layer on top of base

var topLayerCakeGeo = new THREE.CylinderGeometry( 1.5, 1.5, heightTop, 64, 64 ); //Add top layer for cake mesh
var topLayerCakeMat = new THREE.MeshLambertMaterial( { color: flavourColour } ); //Add material
var topLayerCake = new THREE.Mesh( topLayerCakeGeo, topLayerCakeMat ); //Create Mesh
topLayerCake.receiveShadow = true; //Receive shadows
topLayerCake.position.y = positionYbase + positionYmiddle + positionYtop; //Postion layer on top of middle layer

var geometry = new THREE.CubeGeometry(25, 90, 160);
var material = new THREE.MeshLambertMaterial({color: 0xffffff});
var mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.z = 10;
mesh.position.x = 10;

var textureLoader = new THREE.TextureLoader(); //Run function to load textures
textureLoader.crossOrigin = ''; //Prevent errors with cdiferent servers sources

var textureCandleDif = 'candle_DIF.png'; //Path for diffuse texture
var textureCandleBump = 'candle_BUMP.png'; //Path for bump texture
var textureFlameCandleDif = 'candleFlame_DIF.png';
var textureFlameCandleALPHA = 'candleFlame_ALPHA.png';

var textCandleDif = textureLoader.load( textureCandleDif ); //Load diffuse texture
var textCandleBump = textureLoader.load( textureCandleBump ); //Load bump texture
var textFlameCandleDif = textureLoader.load( textureFlameCandleDif ); //Load diffuse texture
var textFlameCandleAlpha = textureLoader.load( textureFlameCandleALPHA ); //Load bump texture

var candleCakeGeo = new THREE.CylinderGeometry( 0.05, 0.05, 1, 16 ); //Add candle for cake mesh
var candleCakeMat = new THREE.MeshPhongMaterial( { map: textCandleDif, bumpMap: textCandleBump, bumpScale: 0.01 } ); //Phong material with difuse, bump (including height) texture

var candleCakeGeo2 = new THREE.CylinderGeometry( 0.05, 0.05, 1, 16 ); //Add candle for cake mesh
var candleCakeMat2 = new THREE.MeshPhongMaterial( { map: textCandleDif, bumpMap: textCandleBump, bumpScale: 0.01 } );

var candleCakeGeo3 = new THREE.CylinderGeometry( 0.05, 0.05, 1, 16 ); //Add candle for cake mesh
var candleCakeMat3 = new THREE.MeshPhongMaterial( { map: textCandleDif, bumpMap: textCandleBump, bumpScale: 0.01 } );


var candleFlameGeo = new THREE.PlaneGeometry( 1, 1, 1, 1 ); //Add candle flame for cake mesh
var candleFlameMat = new THREE.MeshBasicMaterial( { map: textFlameCandleDif, transparent: true, alphaMap: textFlameCandleAlpha } ); //Phong material with difuse, bump (including height) texture

var candleCake = new THREE.Mesh( candleCakeGeo, candleCakeMat ); //Create mesh
var candleFlame = new THREE.Mesh( candleFlameGeo, candleFlameMat ); //Create mesh

var candleCake2 = new THREE.Mesh( candleCakeGeo2, candleCakeMat2 );
var candleCake3 = new THREE.Mesh( candleCakeGeo3, candleCakeMat3 );

candleCake.castShadow = true; //Cast shadows
candleCake.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle; //Postion layer on top of middle layer
candleCake.rotation.y = 90; //Rotate candle by 90 degrees in Y

candleCake2.castShadow = true; //Cast shadows
candleCake2.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle2; //Postion layer on top of middle layer
candleCake2.rotation.y = 90

candleCake3.castShadow = true; //Cast shadows
candleCake3.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle3; //Postion layer on top of middle layer
candleCake3.rotation.y = 90

candleFlame.castShadow = true; //Cast shadows
candleFlame.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle + positionYflame; //Postion layer on top of middle layer
candleFlame.scale.set( 0.5, 0.5, 0.5 );

var cake = new THREE.Object3D(); //Create group
//cake.add( candleCake, candleFlame ); //Add layers to group
cake.position.y = 0.2; //Move cake group layer in Y axis

var textLoaderHB = new THREE.FontLoader();
textLoaderHB.crossOrigin = ''; //Prevent errors with diferent servers sources

var textFontPath = 'https://crossorigin.me/http://andre-anjos.com/projects/cakeIsALie/fonts/theBoldFont_Bold.json';
textLoaderHB.load( textFontPath, function( textFontHB ) {
                               
  var textGeoHB = new THREE.TextGeometry( 'Happy Birthday', {
  font: textFontHB,
  size: 0.4,
  height: 0.1,
  curveSegments: 12,
  bevelThickness: 0.03,
  bevelSize: 0.01,
  bevelEnabled: true
});                           
 
var textMatHB = new THREE.MeshLambertMaterial( { color: 0x119ff4 } );
var textHB = new THREE.Mesh( textGeoHB, textMatHB ); //Create mesh
scene.add( textHB );

textHB.castShadow = true; //Cast shadows
  
textHB.position.x = -2.1; //Move cake group layer in X axis
textHB.position.y = 0.2; //Move cake group layer in Y axis
textHB.position.z = 2.5; //Move cake group layer in Z axis
                            
} );
function changeLayer(){
	var layerNumber = document.getElementById("layer-dropDown").value;
	var cakeType = document.getElementById("type-dropDown").value;
	
	if (cakeType == "round"){
	switch(layerNumber){
case "one":
	cake.remove(midLayerCake,topLayerCake);
	cake.add( baseCake);//,midLayerCake,topLayerCake);//, midLayerCake, topLayerCake, candleCake, candleFlame ); //Add layers to group
	cake.position.y = 0; //Move cake group layer in Y axis
	break;
case "two":
	cake.remove(baseCake,topLayerCake);
	cake.add( baseCake,midLayerCake)//,topLayerCake);//, midLayerCake, topLayerCake, candleCake, candleFlame ); //Add layers to group
	cake.position.y = 0; //Move cake group layer in Y axis
	break;
case "three":
	cake.remove(baseCake,midLayerCake);
	cake.add( baseCake,midLayerCake,topLayerCake);//, midLayerCake, topLayerCake, candleCake, candleFlame ); //Add layers to group
	cake.position.y = 0.2; //Move cake group layer in Y axis
	break;
}
	}
	if (cakeType=="full sheet") {
		cake.add(mesh);
	}
}
//function chageCakeLayers(

var textName;
var textNameID = 'textName';

function cakeName( newName ) {
    
  scene.remove( scene.getObjectByName( textNameID ) );
  
  var textLoaderName = new THREE.FontLoader();
  textLoaderName.crossOrigin = ''; //Prevent errors with diferent servers sources

  textLoaderName.load( textFontPath, function( textFontName ) {

    var textGeoName = new THREE.TextGeometry( newName, {
      font: textFontName,
      size: 0.4,
      height: 0.08,
      curveSegments: 12,
      bevelThickness: 0.03,
      bevelSize: 0.01,
      bevelEnabled: true
    });

  var textMatName = new THREE.MeshLambertMaterial( { color: 0x900C3F } );
  var textName = new THREE.Mesh( textGeoName, textMatName );
  
  scene.add( textName );//Create mesh

  textName.castShadow = true; //Cast shadows
    
  textName.geometry.center();
  textName.position.y = positionYbase + positionYmiddle + positionYtop + positionYtext; //Move text layer in Y axis
  textName.position.z = 1; //Move cake group layer in Z axis
  textName.name = textNameID;
    
  } );
  
};

scene.add( plane, cake ); //Add cake, floor and text to scene

//*********************************************************

//Interactivity

function lightsOut() {
  //cake.add( candleCake);
 var layerNumber = document.getElementById("layer-dropDown").value;
	switch(layerNumber){
		case "one":
		cake.add(candleCake3);
		break;
case "two":
	  cake.add( candleCake2);
	  break;
case "three":
	cake.add( candleCake);
	break;
	  
    }
    /*scene.background = new THREE.Color( "rgb( 0, 0, 0 )" );
    amblight.intensity = 0.05;
    directlight1.intensity =  0.1;
    directlight2.intensity = 0.1;
    directlight1.castShadow = false;
    directlight2.castShadow = false;
    pointLight1.castShadow = true;
    document.getElementById('lights-out').innerHTML = 'Turn Lights On';
    
  } else {
    
    document.getElementById('lights-out').innerHTML = 'Turn Lights Off';
    scene.background = new THREE.Color( "rgb( 193, 237, 233 )" );
    amblight.intensity = 0.5;
    directlight1.intensity =  0.2;
    directlight2.intensity = 0.5;
    directlight1.castShadow = true;
    directlight2.castShadow = true;
    pointLight1.castShadow = false;*/
    
  //}
};

function blowCandle() {
  
  if ( pointLight1.intensity !== 0 ) {
    
    document.getElementById('blow-me').innerHTML = 'Light Candle';
    cake.remove( candleFlame );
    pointLight1.intensity = 0;
    pointLight1.castShadow = false;
  
  } else {
    
    document.getElementById('blow-me').innerHTML = 'BLOW CANDLE!';
    cake.add( candleFlame );
    pointLight1.intensity = 4;
    
  }
};

function changeName() {

  var inputName = document.getElementById('name-input').value;
  cakeName( inputName );

};

function assetsSwitch( colourTop,colourMiddle,colourBase, scaleBaseY ) {

  topLayerCake.material.color.setHex( colourTop );
  midLayerCake.material.color.setHex(colourMiddle);
  baseCake.material.color.setHex(colourBase)
  
  
  baseCake.geometry.computeBoundingBox();
  midLayerCake.geometry.computeBoundingBox();

  var heightBase = baseCake.geometry.boundingBox.max.y -baseCake.geometry.boundingBox.min.y;
  baseCake.scale.y = scaleBaseY;
  positionYbase = heightBase * scaleBaseY / 2;
   positionYmiddle = positionYbase + heightMiddle * 0.5;
  //baseCake.position.y = positionYbase;
 /*/ var heightMiddle = midLayerCake.geometry.boundingBox.max.y -midLayerCake.geometry.boundingBox.min.y;
  
  baseCake.scale.y = scaleBaseY;
  positionYbase = heightBase * scaleBaseY / 2;
  positionYmiddle = positionYbase + heightMiddle * 0.5;
  
  baseCake.position.y = positionYbase;
  midLayerCake.position.y = positionYbase + positionYmiddle;
  topLayerCake.position.y = positionYbase + positionYmiddle + positionYtop;
  candleCake.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle;
  candleFlame.position.y = positionYbase + positionYmiddle + positionYtop + positionYcandle + positionYflame;
  changeName();*/
}
 /*function baseCakeFlavor(){
	var flavour = document.getElementById("baseflavour-dropDown").value;
  
  switch(flavour) {
    
    case "raspberry":
     //assetsSwitch(  0xffffff,0xffffff, 0xC22C47, 0.5 * 2, 1   );
      break;
	case "chocolate":
     // assetsSwitch( 0xffffff,0xffffff, 0x400F15, 0.5 * 2, 1  );
      break;
      
    case "blueberry":   
      //assetsSwitch( 0xffffff,0xffffff, 0xE0E761, 0.5 * 2, 1 );
      break;
      
    case "lemon":
     // assetsSwitch(0xffffff,0xffffff, 0xE0E761, 0.5 * 2, 1   );
      break;
	 
 }
 function midLayerCakeFlavor(){
	var flavour = document.getElementById("middleflavour-dropDown").value;
  
  switch(flavour) {
    
    case "raspberry":
     // assetsSwitch(0xffffff,0xC22C47,0xffffff, 0.5 * 2, 1   );
      break;
	case "chocolate":
     //assetsSwitch(0xffffff,0xC22C47,0xffffff, 0.5 * 2, 1  );
      break;
      
    case "blueberry":   
      // assetsSwitch( 0xffffff,0x250F39,0xffffff, 0.5 * 2, 1);
      break;
      
    case "lemon":
     // assetsSwitch( 0xffffff,0xE0E761,0xffffff, 0.5 * 2, 1);
      break;
	 
 }*/

function changeFlavour() {
  
  var flavour = document.getElementById("topflavour-dropDown").value;
  
  switch(flavour) {
    
    case "raspberry":
      assetsSwitch( 0xC22C47,0x400F15,0xf3e5ab, 0.5 * 2, 1 );
      break;
      
    case "chocolate":
      assetsSwitch( 0x400F15, 0x8db600,0xf3e5ab, 0.5 * 2, 1 );
      break;
      
    case "blueberry":   
      assetsSwitch( 0x250F39,0x563c0d,0xf3e5ab, 0.5 * 2, 1 );
      break;
      
    case "lemon":
      assetsSwitch( 0xE0E761,0xffec89,0x400F15, 0.5 * 2, 1 );
      break;
      
  }
  
}

//*********************************************************

//Render Objects

var render = function() {

  candleFlame.lookAt( camera.position );
	requestAnimationFrame( render ); //Request render frame
	renderer.render(scene, camera); //Render frame
	
};

render(); //Call render function

//***********************************************************