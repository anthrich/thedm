import Tile from './Tile';
import Player from "./Character";
import Narrator from "./Narrator";
import ImageLoader from "./ImageLoader";
import Vector2 from "./Vector2";

export default class Game {
	
	Canvas : HTMLCanvasElement;
	UiCanvas: HTMLCanvasElement;
	Ctx : CanvasRenderingContext2D;
	UiCtx: CanvasRenderingContext2D;
	Player : Player;
	PressedKeys: Array<number>;
	Tiles: Array<Tile>;
	Narrator : Narrator;
	
	constructor(
		canvas : HTMLCanvasElement,
		uiCanvas : HTMLCanvasElement,
		map : Array<Tile>,
		imageLoader : ImageLoader)
	{
		this.Canvas = canvas;
		this.Ctx = canvas.getContext('2d');
		this.UiCanvas = uiCanvas;
		this.UiCtx = uiCanvas.getContext('2d');
		const playerStart = map[Math.floor(Math.random()*map.length)];
		this.Player = new Player(playerStart.position, imageLoader);
		this.PressedKeys = [];
		this.Tiles = map;
		this.update = this.update.bind(this);
		this.draw = this.draw.bind(this);
		this.Narrator = new Narrator();
	}
	
	onKeyDown(keyCode : number) : void {
		const keyIndex = this.PressedKeys.indexOf(keyCode);
		if(keyIndex === -1) this.PressedKeys.push(keyCode);
	}
	
	onKeyUp(keyCode : number) : void {
		const keyIndex = this.PressedKeys.indexOf(keyCode);
		if(keyIndex > -1) this.PressedKeys.splice(keyIndex, 1);
	}
	
	isKeyPressed(keyCode : number) : boolean {
		return this.PressedKeys.indexOf(keyCode) > -1;
	}
	
	update(delta : number) : void {
		const initialPos = this.Player.position;
		const desiredPos = new Vector2(this.Player.position.x, this.Player.position.y);
		if(this.isKeyPressed(68)) desiredPos.x += 10;
		if(this.isKeyPressed(83)) desiredPos.y += 10;
		if(this.isKeyPressed(65)) desiredPos.x -= 10;
		if(this.isKeyPressed(87)) desiredPos.y -= 10;
		this.Player.move(desiredPos, delta);
		let currentTile = this.getCurrentPlayerTile();
		if(currentTile) this.Narrator.setCurrentTile(currentTile);
		else {
			this.Player.position = initialPos;
		}
	}
	
	draw() {
		this.Ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.Ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
		this.Ctx.fillStyle = 'rgba(0,0,0,1)';
		this.Ctx.fillRect(0, 0, this.Canvas.width, this.Canvas.height);
		this.Ctx.translate(
			(this.Canvas.width / 2) - this.Player.position.x,
			(this.Canvas.height / 2) - this.Player.position.y);
		this.Tiles.forEach(t => t.draw(this.Ctx));
		this.Player.draw(this.Ctx);
		this.UiCtx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
		this.UiCtx.font = '48px serif';
		this.UiCtx.fillStyle = 'rgba(255,255,255,1)';
		this.UiCtx.fillText(this.Narrator.AreaDescription, 10, 50);
	}
	
	getCurrentPlayerTile() : Tile {
		return this.Tiles.filter(t =>
			t.position.x <= this.Player.position.x && t.position.x + Tile.Size > this.Player.position.x &&
			t.position.y <= this.Player.position.y && t.position.y + Tile.Size > this.Player.position.y)[0];
	}
}