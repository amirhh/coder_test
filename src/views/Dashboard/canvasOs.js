
// let images = {
//   "src": [
//     {
//       "os": "ios",
//       "base64": `data:image/png;base64,iVBORw0K...`
//     },
//     {
//       "os": "android",
//       "base64": `data:image/png;base64,iVBORw0...`
//     },
//     {
//       "os": "cross",
//       "base64": `data:image/png;base64,iVBORw...`
//     }
//   ]
// }

// // for (let i = 0; i < canvs.length; i++) {
// //   const canvas = canvs[i];
// //   var ctx = canvas.getContext("2d");
// //   const img = new Image();
// //   img.src = `data:image/png;base64,${images.src[0].base64}`;
// //   console.log(images.src[0].os);

// //   img.onload = function () {
// //     ctx.drawImage(img, 10, 10);
// //   }
// // }
// let canvs = document.querySelectorAll(".canvOs");

// function drawMap(i, imgdata) {
//   const canvas = canvs[i];
//   var ctx = canvas.getContext("2d");
//   var image = new Image();
//   image.onload = function () {

//     // canvas.width = image.width;
//     // canvas.height = image.height;
//     // ctx.translate(image.width - 1, image.height - 1);
//     ctx.drawImage(image, 0, 0);
//   };
//   image.src = "http://www.17nightmovie.org/upload/slideshow/385/xmgAsda5sPNpx5ghJibJ80S7Pfx.jpg?ft=570dd6e484ee751fcf5dad189e8d1300";
// }
// for (let i = 0; i < canvs.length; i++) {
//   drawMap(i, `${images.src[i].base64}`);
// }
// // console.log(images.src[0]);


var
	carousel = document.querySelector('.carousel'),
	figure = carousel.querySelector('figure'),
	nav = carousel.querySelector('nav'),
	numImages = figure.childElementCount,
	theta =  2 * Math.PI / numImages,
	currImage = 0
;
	
nav.addEventListener('click', onClick, true);

function onClick(e) {
	e.stopPropagation();
	
	var t = e.target;
	if (t.tagName.toUpperCase() !== 'BUTTON')
		return;
	
	if (t.classList.contains('next')) {
		currImage++;
	}
	else {
		currImage--;
	}
	
	figure.style.transform = `rotateY(${currImage * -theta}rad)`;
}