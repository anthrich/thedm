import Tile from "./Tile";
import Vector2 from "./Vector2";

export default class DungeonTile extends Tile {
	
	Image : HTMLImageElement;
	
	constructor(position : Vector2, image : HTMLImageElement) {
		let adj = ["", "dusty ", "cracked ", "ancient ", "pristine "];
		let descs = ["stone tiles", "stone slabs", "stone paving"];
		super(position, `${adj[Math.floor(Math.random()*adj.length)]}${descs[Math.floor(Math.random()*descs.length)]}`);
		this.Image = image;
	}
	
	draw(canvas : CanvasRenderingContext2D) : void {
		if(!this.Image.complete) return;
		for (let x = 0; x < 4; x++) {
			for (let y = 0; y < 4; y++) {
				canvas.drawImage(
					this.Image,
					this.position.x + (x * 32),
					this.position.y + (y * 32));
			}
		}
	}
}