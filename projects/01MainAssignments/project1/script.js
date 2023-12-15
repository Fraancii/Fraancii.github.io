let string = "flow"; //words to be displayed
let size = 200; //font size
let fontFile = "Muli-Black.otf";
let showText = true; //whether or not to have an overlay of the original text (in the background color)
let textAlpha = 10; //the alpha of the text if displayed (low value will make it slowly fade in)
let backgroundColor = 0; //kinda self-explanatory
let strokeAlpha = 260; //the alpha of the lines (lower numbers are more transparent)
let strokeColor = 255; //the line color

let fontSampleFactor = 0.3; //How many points there are: the higher the number, the closer together they are (more detail)

let noiseZoom = 0.006; //how zoomed in the perlin noise is
let noiseOctaves = 4; //The number of octaves for the noise
let noiseFalloff = 0.5; //The falloff for the noise layers

let zOffsetChange = 0; //How much the noise field changes in the z direction each frame
let individualZOffset = 0; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

let lineSpeed = 0.5; //the maximum amount each point can move each frame

let newPointsCount = 6; //the number of new points added when the mouse is dragged


var font;
var points = [];
var startingPoints;


let w = 1920;
let h = 200;
let scl = 20;
let yoff = 0.0;
let margin = 50;

function preload() {
	font = loadFont(fontFile);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(backgroundColor);
	textFont(font);
	textSize(size);
	fill(backgroundColor, textAlpha);
	stroke(strokeColor, strokeAlpha);
	noiseDetail(noiseOctaves, noiseFalloff);

	//font.textToPoints (str, x, y, [fontSize], [options]) as an input and as an output it gives me an array of array, in this case x and y positions
	startingPoints = font.textToPoints(string, width / 2 - textWidth(string) / 2, height / 2 + 100, size, {"sampleFactor": fontSampleFactor});
	//print(`points position, ${startingPoints}`); 
	
	for (let p = 0; p < startingPoints.length; p++) {
		points[p] = startingPoints[p]; //points and startingPoints are in the same position at the beginning
		points[p].zOffset = random(); //=each element of the array has an attribute (zOffset) which is randomized
	}
	
}

function draw() {
	
	//text 'go with the'
	push();
	textSize(100);
	text('go with the', width/5, height/3-10);
	noStroke();
	pop();
	
	//show text 'flow'
	if(showText){
		noStroke();
		text(string, width / 2 - textWidth(string) / 2, height);
		fill(backgroundColor, textAlpha);
		stroke(strokeColor, strokeAlpha);
	}

	//noise effect of the word 'flow'
	for (let pt = 0; pt < points.length; pt++) { //it creates a loop for each point
		let p = points[pt];
		let noiseX = p.x * noiseZoom; 
		let noiseY = p.y * noiseZoom;
		let noiseZ = frameCount * zOffsetChange + p.zOffset*individualZOffset;
		let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed); //here it defines the new points to create the lines
		let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
		line(p.x, p.y, newPX, newPY);
		p.x = newPX;
		p.y = newPY;
	}
}

function keyPressed() {
	if (key == 's') {
		save(); //to save the image 
	}
}