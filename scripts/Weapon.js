/*/////////////
//	Weapon	//
////////////////////////////////////////////
///
//	Weapon needs to have inheritance from Item(),
	currently does not.

	
//
////////////////////////////////////////////*/



//@constructor
function Weapon(name, type, gValue, numDice, damageDice){
	this.name = name;
	this.type = type;
	this.gValue = gValue;
	this.damageDice = damageDice;
	this.numDice = numDice;

}

//Weapon definitions
const sword01 = new Weapon("Turbo Lover", "greatsword", 600, 4,12);
const sword02 = new Weapon("Fate Sever", "dagger", 1000, 8,6);
const sword03 = new Weapon("Rainfall", "rapier", 20000, 1,6);
const fist00 = new Weapon("Unnarmed", "fist", 0, 1, 4);



