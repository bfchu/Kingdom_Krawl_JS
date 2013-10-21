///////////////////
//	Creature 	//
///////////////////////////////////////////////////
///
//


//////////////////////////////////////////////////

//@constructor
function Creature(id,job,position,name,level){
	//system data
	this.id = id;
	this.job = job; //JobClass obj; contains stat rates for leveling.
	this.icon = getJobDef(this.job).icon;
	this.position = position; //Position obj (x,y)
	
	//character data
	this.name = name;
	this.level = level;
	this.exp = 0;
	
	//stats
	this.healthMax = level * getJobDef(this.job).hitDice;
	this.currentHealth = this.healthMax;
	this.manaMax = level * getJobDef(this.job).spellDice;
	this.currentMana = this.manaMax;

	this.strongth = level * getJobDef(this.job).strongth; 
	this.agility = level * getJobDef(this.job).agility;
	this.wisdom = level * getJobDef(this.job).wisdom;

	this.skills = getJobDef(this.job).startingSkills; //array[] of skills values in doubles.
	this.spells = getJobDef(this.job).startingSpells;

	//posessions
	this.weapon = getJobDef(this.job).startingWeapon;
	if(getJobDef(this.job).startingGold.numDice != null){
		this.gold = Dice.roll(getJobDef(this.job).startingGold.numDice, getJobDef(this.job).startingGold.dieSize);
	} else {
		this.gold = getJobDef(this.job).startingGold;
	}
	this.inventory = [];

	this.getIndex = function(){
		return getGridIndex(position.x, position.y);
	}

	this.findMe = function(){ //returns the index into creatures[] that matches this creature's position.
		for(var ii = 0; ii< creatureCount; ii++){
			if(creatures[ii].position.equals(this.position)){
				return ii;
			}
		}
		return null;
	}

	this.attack = function(target){
		if(target != null){
			var dmg = this.getDmg();
			// dmg = Math.floor(dmg);
			writeLine(this.name + " attacks " + target.name + " for " + dmg + ".");
			target.currentHealth -= (dmg);

			if(target.currentHealth < 0){
				writeLine(this.name + " slays " + target.name + ".");
				this.getExp(target.level * EXP_RATE);
				target.dies();
			} else{
				target.counterAttack(this);
			}
		}
	}

	this.counterAttack = function(attacker){
		if(attacker != null){
			var dmg = this.getDmg();
			writeLine(this.name + " attacks " + attacker.name + " for " + dmg + ".");
			attacker.currentHealth -= (dmg);
			if(attacker.currentHealth < 0){
				writeLine(this.name + " slays " + attacker.name + ".");
				this.getExp(attacker.level * EXP_RATE);
				attacker.dies();
			}
		}
	}


	this.getDmg = function(){
		return Math.floor(DAMAGE_RATE * this.strongth + Dice.roll(this.weapon.numDice, this.weapon.damageDice));
	}

	this.dies = function(){
		console.log("In Creature.dies(): " + this.findMe() + ": " + this.name);
		if(this.findMe() == player){
			playerIsAlive = false;
			creatures.splice(this.findMe(), 1);
			creatureCount--;
		} else {
			if(this.gold > 0){
				items[itemCount] = new Item("gold","gold", this.position, this.gold);
				itemCount++;
			}
			creatures.splice(this.findMe(), 1);
			creatureCount--;
		}
	}

	this.getExp = function(val){
		this.exp += val;
		if(this.findMe() == player){
			writeLine("You got " + val + " experience.");
		}
		if(this.exp > (this.level+1) * (this.level+1)){
			this.levelUp();
		}
	}

	this.levelUp = function(){
		this.level++;
		this.exp -= level * level;
		this.healthMax += getJobDef(this.job).hitDice;
		this.currentHealth = this.healthMax;
		this.manaMax += getJobDef(this.job).spellDice;
		this.currentMana = this.manaMax;
		this.strongth += getJobDef(this.job).strongth;
		this.agility += getJobDef(this.job).agility;
		this.wisdom += getJobDef(this.job).wisdom;

		writeLine("You have reached Level " + this.level + "!");
	}


	this.tryMove = function(moveX, moveY, floor){

		var pos = new Position (this.position.x + moveX, this.position.y + moveY, this.position.floor);
		var moveIndex = getGridIndex(pos.x,pos.y);
		var peek = peekAt(pos.x, pos.y, pos.floor);
		//console.log("In tryMove(): peek: " + peek );
		switch(peek){
			case "WALKABLE":
				this.position.x += moveX;
				this.position.y += moveY;
				if(floor != null){
					this.position.floor = floor;
				}
				break;
			case "CREATURE":
				this.attack(creatures[getTile(pos).hasCreature()]);
				break;
			case "WALL":
				writeLine("Ooof!");
			default:
				break;
		}
	}

	this.teleport = function(destination){

		if(getTileDef(getTile(destination).type).isWalkable){
			this.position = destination;
			writeLine("The portal takes you to " + world[this.position.floor].name + ".");
		} else {
			writeLine("Cannot teleport to destination.");
		}
	}

	this.interactWith = function(feature){
		//is it a portal? (stairs, trap doors, gateways)

		if(feature.destination != null){
			this.teleport(feature.destination);
		}
		//is it a fountain?
		//is it a shop?
		//is it a shrine?
	}

	this.pickUp = function(itemIndex){
		if(items[itemIndex].name == "gold"){
			this.gold += items[itemIndex].quantity;
			items.splice(itemIndex,1);
			itemCount--;
		} else {
			this.iventory[this.inventory.length] += items[itemIndex];
			items.splice(itemIndex,1);
			itemCount--;
		}
	}

}