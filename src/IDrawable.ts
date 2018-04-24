import Vector2 from "./Vector2";

export default interface IDrawable {
	draw(context : CanvasRenderingContext2D) : void;
	position : Vector2;
}