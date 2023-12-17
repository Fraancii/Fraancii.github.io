class Message {
	//a constructor is the object setup, in which I define the data of the obj
	constructor(x, y, color, string) {  //here it defines the variables of the constructor
		this.color = color
		this.x = x
		this.y = y
		this.f = 0
		this.destroying = false
		this.icon = []
		this.txt = "X"
		this.string = "Random message"
	}

	display() {
		push()
		stroke(this.color)
		strokeCap(ROUND);
		strokeWeight(10);
		translate(this.x, this.y)

		// falling animation adapted from https://openprocessing.org/sketch/2019027
		for (let i = -100; i < 200; i += 20) {
			for (let j = -100; j < 800; j++) {
				let F = this.f % height - 200;
				if (j > F && j < (F + 200)) {
					let Y = 0;
					if (j > 200) Y = (noise(j / 400, i + i / 66, this.f / 400) - 0.5) * (200 - j)
					line(i + Y, j + Y * 2, i + Y + 20, j + Y * 2);
				}
			}
		}

		//draw the circle, the position numbers are arbitrary
		fill(this.color)
		circle(- 140, 50, 50);
		pop()

		//create position for close icon
		let pos = { "x": this.x + 190, "y": this.y - 90, "size": 20 }
		if (this.icon.length < 1) {
			this.icon.push(pos)
		}

		push()
		fill(0, 0, 0)
		//textSize(30);
		text(this.string, this.x - 50, this.y - 50) //use the same coordinate of the box and make it disappear when it reaches a certain pixel coordinate
		this.closeIcon(pos);
		pop()
	}

	destroy() {
		if (this.f < height - 10) {
			this.f += 5;
		}
		//hide close icon
		this.txt = ""
		this.icon[0].size = 0
	}

	closeIcon(pos) {
		//make this.color when destroying otherwise keep black
		fill(this.destroying ? this.color : "black")
		rect(this.icon[0].x, this.icon[0].y, this.icon[0].size, this.icon[0].size)
		fill(this.color)
		text(this.txt, this.icon[0].x - 4, this.icon[0].y + 4)
	}
}