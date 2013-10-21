///////////////////////
//	tileDefinitions	//
/////////////////////////////////////////////////////////////////
///
//	
//
///////////////////////////////////////////////

//@constructor
function TileDefinition(name, icon, isWalkable) {
	this.name = name;
	this.icon = icon;
	this.isWalkable = isWalkable;
}

//TILES
//function TileDefinition(name, icon, isWalkable)
var tileDefinitions = []; //defines the default properties of tile types.
tileDefinitions[0] = new TileDefinition("WALL", "wall", false);
tileDefinitions[1] = new TileDefinition("FLOOR", "floor", true);
tileDefinitions[2] = new TileDefinition("WATER", "water", false);
tileDefinitions[3] = new TileDefinition("PIT", "black", false);

function getTileDef(id){
	switch(id.toUpperCase()){
		case "FLOOR":
			return tileDefinitions[1];
		case "WATER":
			return tileDefinitions[2];
		case "PIT":
			return tileDefinitions[3];
		case "WALL":
		default:
			return tileDefinitions[0];
	}
}