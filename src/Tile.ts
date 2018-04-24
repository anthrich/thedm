import IDrawable from "./IDrawable";
import Vector2 from "./Vector2";

export default abstract class Tile implements IDrawable {
	
	Description : string;
	static Size = 128;
	position : Vector2;
	
	constructor(position : Vector2, desc : string) {
		this.Description = desc;
		this.position = new Vector2(position.x, position.y);
	}
	
	abstract draw(canvas : CanvasRenderingContext2D) : void;
}