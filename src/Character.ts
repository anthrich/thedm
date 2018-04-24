import IDrawable from "./IDrawable";
import ImageLoader from "./ImageLoader";
import Vector2 from "./Vector2";

export default class Character implements IDrawable {
	
	position : Vector2;
	image : HTMLImageElement;
	movementSpeed : number;
	
	constructor(position : Vector2, imageLoader : ImageLoader) {
		this.position = new Vector2(position.x, position.y);
		this.image = imageLoader.Paladin;
		this.movementSpeed = 300;
	}
	
	move(desiredPos : Vector2, delta : number) : void {
		const moveSpeedThisUpdate = this.movementSpeed / 1000 * delta;
		let subtract = Vector2.subtract(desiredPos, this.position);
		let direction = Vector2.normalise(subtract);
		const scaled = Vector2.scale(moveSpeedThisUpdate, direction);
		this.position = Vector2.sum(this.position, scaled);
	}

	draw(context : CanvasRenderingContext2D) : void {
		context.drawImage(
			this.image,
			this.position.x - (this.image.width / 2),
			this.position.y - (this.image.height));
	}
}