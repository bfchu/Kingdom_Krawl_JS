///////////////////
//	JobClass	..
//////////////////////////////////////////
///
//

/////////////////////////////////////////



//@constructor
function JobClass(className, icon, hitDice, spellDice, strongth, agility, wisdom, startingSkills, startingSpells, startingWeapon, startingGold){
	this.className = className;
	this.icon = icon;
	this.hitDice = hitDice;
	this.spellDice = spellDice;

	this.strongth = strongth; 
	this.agility = agility;
	this.wisdom = wisdom;

	this.startingSkills = startingSkills; //array[] of skills values in doubles.
	this.startingSpells = startingSpells;

	//posessions
	this.startingWeapon = startingWeapon;
	this.startingGold = startingGold;
	//this.equipment = startingEquips;
}

var jobDefinitions = [];
//JobClass(className, hitDice, spellDice, strongth, agility, wisdom, startingSkills, startingSpells, startingWeapon, startingGold)
jobDefinitions[0] = new JobClass("Strong Hero", "hero", 12, 3, 10,4,1, [], [], sword01, 0);
jobDefinitions[1] = new JobClass("Fast Hero","hero", 10, 4, 5,8,2, [], [], sword02, 20);
jobDefinitions[2] = new JobClass("Wise Hero", "hero", 8, 8, 4,3,8, [],[], sword03, 100);
jobDefinitions[3] = new JobClass("Goblin", "goblin", 10, 1, 6,5,2, [], [] , fist00, {numDice:20, dieSize:8});
jobDefinitions[4] = new JobClass("Dragon", "dragon", 12, 4, 10,6,4, [], [], fist00, {numDice:20, dieSize:100});
jobDefinitions[5] = new JobClass("Golem", "golem", 20, 1, 8,2,1, [], [], fist00, {numDice:20, dieSize:6});

function getJobDef(id){
	switch(id.toUpperCase()){
		case "STRONG HERO":
			return jobDefinitions[0];
		case "FAST HERO":
			return jobDefinitions[1];
		case "WISE HERO":
			return jobDefinitions[2];
		case "GOBLIN":
			return jobDefinitions[3];
		case "DRAGON":
			return jobDefinitions[4];
		case "GOLEM":
			return jobDefinitions[5];
		default:
			return jobDefinitions[3];
	}
}

function getRandMonster(){
	var dRoll = Dice.roll(1,3);
	var index = null;
	switch(dRoll){
		case 1:
			index = "Goblin";
			break;
		case 2:
			index = "Dragon";
			break;
		case 3:
			index = "Golem";
			break;
		default:
			index = "Strong Hero";
			break;
	}
	return index;
}