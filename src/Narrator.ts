import Tile from "./Tile";

export default class Narrator {
	CurrentTile : Tile;
	AreaDescription : string;
	NewTileIsSimilar : boolean;
	AreaIntroductions : Array<string>;
	
	constructor() {
		this.AreaDescription = "";
		this.CurrentTile = null;
		this.AreaIntroductions = [
			`you find yourself standing on`,
			`you're surrounded by`,
			`the area is`
		];
	}
	
	setCurrentTile(newTile : Tile) {
		if(newTile === this.CurrentTile) return;
		if(this.CurrentTile && this.CurrentTile.Description == newTile.Description) {
			this.NewTileIsSimilar = true;
		} else {
			this.NewTileIsSimilar = false;
		}
		this.AreaDescription = this.getAreaDescription(newTile);
		this.CurrentTile = newTile;
	}
	
	getAreaDescription(tile : Tile) : string {
		return `${this.NewTileIsSimilar ? 'again,' : ''} ${this.getAreaIntro()} ${tile.Description}`;
	}
	
	getAreaIntro() : string {
		return this.AreaIntroductions[Math.floor(Math.random()*this.AreaIntroductions.length)];
	}
}