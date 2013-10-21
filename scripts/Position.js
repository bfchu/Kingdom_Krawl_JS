///////////////////
//	Position	//
////////////////////////////////////////////////
///
//

///////////////////////////////////////////////

//@constructor
function Position(x,y,floorId){
	this.x = x;
	this.y = y;
	this.floor = floorId;

	this.equals = function(other){
		if( this.x == other.x &&
			this.y == other.y &&
			this.floor == other.floor){
			return true;
		}
		return false;
	}
}