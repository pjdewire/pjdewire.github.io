function Troop(name, size, time) {
	this.name = name;
	this.size = size;
	this.time = time;
	this.have = true;
}
function Barrack(index, space, taken, time) {   // taken == space taken
	this.index = index;
	this.space = space;
	this.taken = taken;
	this.time = time;
	this.nTroop = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
var klaus = function() {    // collect values from form and write them
	var troops = new Array(); 
	var barracks = new Array();
	var rest = new Array();
	var i;
	var j;
	// var target = document.getElementById("targetLocation");
	var target = [	document.getElementById("targetLocation"), 
					document.getElementById("targetLocation1"), 
					document.getElementById("targetLocation2"), 
					document.getElementById("targetLocation3")];
	var iterations = 0;                         // loop interations
	var curTroop;
	var curBarracks;
	var min = Number.MAX_SAFE_INTEGER;          // temp min variable
	var iMin = 0;                               // temp min index
	var rCount = 0;                             // number of "rest"'s
	var rDiv = 0;								// division of remainer
	var campSpace = document.getElementById("Camp").value;
	var totalTime = 0;

	troops[0] = new Troop("Barbarian", 1, 20);
	troops[1] = new Troop("Archer", 1, 25);
	troops[2] = new Troop("Goblin", 1, 30);
	troops[3] = new Troop("Giant", 5, (2*60));
	troops[4] = new Troop("Wall Breaker", 2, (2*60));
	troops[5] = new Troop("Balloon", 5, (8*60));
	troops[6] = new Troop("Wizard", 4, (8*60));
	troops[7] = new Troop("Healer", 14, (15*60));
	troops[8] = new Troop("Dragon", 20, (30*60));
	troops[9] = new Troop("Pekka", 25, (45*60));

	// load data from form
	for (i = 0; i < troops.length; i++) {
		if (isNaN(document.getElementById(troops[i].name).value.substring(0, 1))) {
			rest[rCount] = i;
			rCount++;
		}
		else {
			troops[i].count = parseInt(document.getElementById(troops[i].name).value, 10);
			campSpace -= (troops[i].count * troops[i].size);
		}
	}

	// compute filling troops
	if (rCount > 0) {
		rDiv = campSpace / rCount;
		for (i = (rCount - 1); i >= 0; i--) {		// go from largest to smallest
			troops[rest[i]].count = Math.floor((campSpace / (i + 1)) / troops[rest[i]].size);
			campSpace -= troops[rest[i]].count;
		}
	}

	// print "Troop -- number"; get total time
	for (i = 0; i < troops.length; i++) {
		if (troops[i].count != 0) {
			totalTime += (troops[i].count * troops[i].time);
			target[0].appendChild(document.createTextNode(troops[i].name + " -- " + troops[i].count));
			target[0].appendChild(document.createElement("br"));
		}
	}   

	target[0].appendChild(document.createTextNode("Total time -- " + (totalTime / 240) + " mins/barracks"));

	barracks[0] = new Barrack(0, 75, 0, 0);
	barracks[1] = new Barrack(1, 75, 0, 0);
	barracks[2] = new Barrack(2, 75, 0, 0);
	barracks[3] = new Barrack(3, 75, 0, 0);

	for (curTroop = 9; curTroop >= 0; curTroop--) {	// loop through troops
		for (curBarracks = 0; curBarracks < barracks.length; curBarracks++) { // loop through barracks
			while (troops[curTroop].count > 0) {		// want another troop?
				if (((barracks[curBarracks].time + troops[curTroop].time) <= ((totalTime / 4) + 5)) && ((barracks[curBarracks].taken + troops[curTroop].size) <= barracks[curBarracks].space)) {
					troops[curTroop].count--;       // get rid of a troop
					barracks[curBarracks].time += troops[curTroop].time;
					barracks[curBarracks].taken += troops[curTroop].size;
					barracks[curBarracks].nTroop[curTroop]++;
				}
				else {
					break;
				}
			}
		}
	}

	target[0].appendChild(document.createElement("br"));
	target[0].appendChild(document.createTextNode("~~~~~~~~~~~~~~~~"));
	target[0].appendChild(document.createElement("br"));
	for (i = 0; i < barracks.length; i++) {
		target[i].appendChild(document.createTextNode("Barracks " + barracks[i].index + ": " + barracks[i].taken + " spaces taken"));
		target[i].appendChild(document.createElement("br"));
		for (j = 0; j < troops.length; j++) {
			if (barracks[i].nTroop[j] > 0) {
				target[i].appendChild(document.createTextNode(troops[j].name + "s: " + barracks[i].nTroop[j]));
				target[i].appendChild(document.createElement("br"));
			}
		}
		target[i].appendChild(document.createElement("br"));
		target[i].appendChild(document.createElement("br"));
	}
}

var clearBox = function(elementID) {
	document.getElementById(elementID).innerHTML = "";
	document.getElementById("targetLocation1").innerHTML = "";
	document.getElementById("targetLocation2").innerHTML = "";
	document.getElementById("targetLocation3").innerHTML = "";
}

var zoom = function() {
	document.body.style.zoom = "150%";
}
