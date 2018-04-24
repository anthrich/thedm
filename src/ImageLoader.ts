import tombstoneslab from '../res/tomb_0_new.png';
import paladin from '../res/paladin.png';

export default class ImageLoader {
	
	TombStoneSlab : HTMLImageElement;
	Paladin : HTMLImageElement;
	
	constructor() {
		this.TombStoneSlab = new Image();
		this.TombStoneSlab.src = tombstoneslab;
		this.Paladin = new Image();
		this.Paladin.src = paladin;
	}
}