import './index.html';
import './styles.scss';
import Game from './src/Game';
import DungeonTile from "./src/DungeonTile";
import Tile from "./src/Tile";
import ImageLoader from './src/ImageLoader';
import dungeon from './res/dungeon.tsv';
import Vector2 from "./src/Vector2";

const canvas = <HTMLCanvasElement>document.getElementById('main-canvas');
const uiCanvas = <HTMLCanvasElement>document.getElementById('ui-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
uiCanvas.height = canvas.height;
uiCanvas.width = canvas.width;
const imageLoader = new ImageLoader();

const tileSelector = (tile : string, x : number, y : number) : Tile => {
	if(tile !== '') return new DungeonTile(new Vector2(x * Tile.Size, y * Tile.Size), imageLoader.TombStoneSlab);
	else return null;
};

fetch(dungeon)
	.then((response) => response.text())
	.then((data) => {
		const cells = data
			.split('\n')
			.map((line, y) => 	line.split('\t').map((str, x) => tileSelector(str, x, y)))
			.reduce((arr, tiles) => arr.concat(tiles), [])
			.filter((tile) => tile !== null);
		
		const game = new Game(canvas, uiCanvas, cells, imageLoader);
	
		// hook up key events //
		window.addEventListener("keydown", (evt) => {
			game.onKeyDown(evt.keyCode);
		});
		window.addEventListener("keyup", (evt) => {
			game.onKeyUp(evt.keyCode);
		});

		// hook up draw loop //
		let doDraw = () => {
			game.draw();
			window.requestAnimationFrame(doDraw);
		}
		window.requestAnimationFrame(doDraw);

		// hook up update loop //
		setInterval(() => {
			game.update(10);
		}, 10);
	});


