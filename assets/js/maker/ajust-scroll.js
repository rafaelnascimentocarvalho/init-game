let main = document.getElementById("main");
let scrolling = true;

let doc = document.documentElement;

export default class Scroll{

	ajustScroll(direct, char){

		let prop = 50;

		let top  = doc.scrollTop;	
		let left = doc.scrollLeft;

		let width  = window.innerWidth;
		let height = window.innerHeight;

		let char_top  = char.element.offsetTop;
		let char_left = char.element.offsetLeft;		
		let char_bottom = char.element.offsetHeight + char_top;
		let char_right  = char.element.offsetWidth + char_left;

		let margin = prop * 4;
		let limit_top  = top + margin;
		let limit_left = left + margin;
		let limit_right  = left + (width - margin);
		let limit_bottom = top + (height - margin);

		if(direct == 'up' && char_top < limit_top){
			let go_to = (char_bottom - height) + margin;

			this.goTo('y', go_to);
		}

		if(direct == 'left' && char_left < limit_left){
			let go_to = (char_left - width) + margin;			

			this.goTo('x', go_to);			
		}

		if(direct == 'right' && char_right > limit_right){
			let go_to = char_right - margin;						

			this.goTo('x', go_to);			
		}

		if(direct == 'down' && char_bottom > limit_bottom){
			let go_to = char_bottom - margin;

			this.goTo('y', go_to);			
		}
	}

	goTo(direct, go){

		if(scrolling){

			scrollTo(go, direct);

			scrolling = false;

			setTimeout(function(){
				scrolling = true;
			}, 500);
		}
	}

	ajustScreen(char){

		let width  = window.innerWidth / 2;
		let height = window.innerHeight / 2;

		let axisY = char.axisY * char.prop;
		let axisX = char.axisX * char.prop;

		let goY = axisY - height;
		let goX = axisX - width;

		setTimeout(function(){
			doc.scrollTop  = goY;
			doc.scrollLeft = goX;
		}, 350);
	}

	onScreen(char){

		let top  = doc.scrollTop;	
		let left = doc.scrollLeft;

		let width  = window.innerWidth;
		let height = window.innerHeight;

		let char_top  = char.element.offsetTop;
		let char_left = char.element.offsetLeft;		
		let char_bottom = char.element.offsetHeight + char_top;
		let char_right  = char.element.offsetWidth + char_left;

		let limit_top  = top;
		let limit_left = left;
		let limit_right  = left + width;
		let limit_bottom = top + height;

		if(char_top < limit_top || char_left < limit_left || char_bottom > limit_bottom || char_right > limit_right){
			return false
		}

		return true
	}
}

function scrollTo(to, direct) {
	
	let duration = 200;
    let start = (direct == 'y') ? doc.scrollTop : doc.scrollLeft;
    let change = to - start;

    let currentTime = 0;
    let increment = 5;

    let animateScroll = function(){        
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        
        if(direct == 'y'){
        	doc.scrollTop = val;
        }
        else{
        	doc.scrollLeft = val;        	
        }

        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };

    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};
