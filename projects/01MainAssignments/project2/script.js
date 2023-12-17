let starsX = [];
let starsY = [];
let colorMex;
let msg;
let txt;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	
	for(let i=0; i<200; i++) {
		starsX[i] = random(width);
		starsY[i] = random(height);
		//colorMex = color('#F9EBDE')
		colorMex = color('#FFFFFF')

	}
	msg = new Message(width/2, height/2, colorMex, "") //define the obj 'msg' depending on the class new Message
	txt = new Text()
}

function draw() {
	background(0);
	
	// stars
	for(let i=0; i<starsX.length; i++) {
		push();
			fill(255);
			stroke(255)
			translate(starsX[i],starsY[i])
			rotate(frameCount*0.5+starsX[i]);
			rect(0,0,2,2)
		pop();
	} 
	
	//message display
	msg.display()
	if (msg.destroying){
			msg.destroy()
	}
}

function mousePressed() {
	//calculate distance between closeIcon and a mouse
	if(dist(msg.icon[0].x,msg.icon[0].y, mouseX, mouseY) < msg.icon[0].size/2){
		msg.destroying = true;
	}	
}