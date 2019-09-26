var x__ = 0, y__ = 0;
var earth, moon, stars;
var ship;

function setup() {
	let cvs = createCanvas(windowWidth, windowHeight, WEBGL);
	
   earth = loadImage("earth.jpg");
   moon = loadImage("moon.jpg");
   stars = loadImage("stars.jpg");
   ship = loadModel('future.jpg');

	
	cvs.requestPointerLock = cvs.requestPointerLock ||
								cvs.mozRequestPointerLock;

	document.exitPointerLock = document.exitPointerLock ||
							document.mozExitPointerLock;
							
	
	canvas.onclick = function() {
		canvas.requestPointerLock();
	};
	

	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
}

function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
	x__ = 0;
	y__ = 0;
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}

function updatePosition(e) {
  x__ += e.movementX;
  x__ += e.movementY; // USE BOTH AXIS to update position !
}

function draw() {
	background(50);
	
	let theta = x__ * 1.0 / windowWidth * PI / 6 * 4 / 2;
	//camera(600 * sin(theta), 0, 600 * cos(theta), 0, 0, 0, 0, 1, 0);

	rotateY(theta);
	
	push();
	fill(255);
	texture(stars);
	sphere(3000);
	pop();
	
	
	directionalLight(255, 255, 255, sin(theta), 0, cos(theta));
	ambientLight(25);
	fill(255);
	noStroke();
	//stroke(122);
	ambientMaterial(255);
	push();
	translate(-400, 100, 0);
	rotateX(PI);
	scale(10);
	model(ship);
	pop();

	
	push();
	texture(earth);
	sphere(150);
	pop();
	
	
	push();
	translate(500, 0, 0);
	texture(moon);
	sphere(30);
	pop();
	
}
