let main = document.getElementById("main");
let scrolling = true;

export default class Scroll{

	ajustScroll(direct, char){

		let doc = document.documentElement;

		let docY = doc.scrollTop;
		let docX = doc.scrollLeft;

		let top  = doc.scrollTop;	
		let left = doc.scrollLeft;

		let width  = window.innerWidth;
		let height = window.innerHeight;

		let wWidth  = main.offsetWidth;
		let wHeight = main.offsetHeight;

		let char_top  = char.element.offsetTop;
		let char_left = char.element.offsetLeft;		
		let char_bottom = char.element.offsetHeight + char_top;
		let char_right  = char.element.offsetWidth + char_left;

		let margin = height / 5;
		let limit_top  = top + margin;
		let limit_left = left + margin;
		let limit_right  = left + (width - margin);
		let limit_bottom = top + (height - margin);

		if(direct == 'up' && char_top < limit_top){
			let go_to = top - height + (margin * 2);

			this.goTo('up', go_to);
		}

		if(direct == 'left' && char_left < limit_left){
			let go_to = left - width - (margin * 2);			

			this.goTo('left', go_to);
		}

		if(direct == 'right' && char_right > limit_right){
			let go_to = left + width - (margin * 2);						

			this.goTo('right', go_to);
		}

		if(direct == 'down' && char_bottom > limit_bottom){
			let go_to = top + height - (margin * 2);			

			this.goTo('down', go_to);
		}
	}

	goTo(direct, go){

		if(scrolling){

			let doc = document.documentElement;				

			scrollTo(doc, go, direct);

			scrolling = false;

			setTimeout(function(){
				scrolling = true;
			}, 500);
		}
	}
}


function scrollTo(element, to, direct) {

	let duration = 200;
    let start = (direct == 'up' || direct == 'down') ? element.scrollTop : element.scrollLeft;
    let change = to - start;

    let currentTime = 0;
    let increment = 5;

    let animateScroll = function(){        
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        
        if(direct == 'up' || direct == 'down'){
        	element.scrollTop = val;
        }
        else{
        	element.scrollLeft = val;        	
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
