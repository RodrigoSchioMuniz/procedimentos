function pickOne(atributo)  {
	return atributo[parseInt(Math.random() * atributo.length)];
}

function geraFace(background, cor, shape, face) {
	if(background) {
		localStorage.setItem("face-bgcolor", pickOne(cores));

		let valorR = parseInt(localStorage.getItem("face-bgcolor")[0], 16);
		let valorG = parseInt(localStorage.getItem("face-bgcolor")[2], 16);
		let valorB = parseInt(localStorage.getItem("face-bgcolor")[4], 16);

		if(valorR + valorG + valorB > 24)
			localStorage.setItem("face-fontcolor", true);
		else
			localStorage.setItem("face-fontcolor", false);
	}

	let bgcolor = localStorage.getItem("face-bgcolor");

	if(cor) {
		localStorage.setItem("face-cor", parseInt(Math.random() * 6));
	}

	if(shape) {
		localStorage.setItem("face-shape", parseInt(Math.random() * 4));
	}

	if(face) {
		localStorage.setItem("face-face", parseInt(Math.random() * 8));
		localStorage.setItem("face-pos-x", parseInt(Math.random() * 80));
		localStorage.setItem("face-pos-y", parseInt(Math.random() * 40));
	}

	let container="<div style=\"padding:0px 34px; width:100vw; height:100vh; background-color:#" + bgcolor + "; display:flex; align-items:center; justify-content:center;\">";
	container += "<canvas width=232 height=232 style='animation:exibition" + parseInt(Math.random() * 7) + " 1s; background-color:#" + bgcolor + ";' id=canvas></canvas>";
	container += "</div>";

	botoes = "<div id=botoes>";
	botoes += "<button style='position:fixed; bottom:69px; height:30px; right:128px; width:122px;' onclick=\"geraFace(true, true, true, true);\">outro</button>";
	botoes += "<button style='position:fixed; bottom:69px; height:30px; right:4px; width:122px;' onclick=\"geraFace(true, false, false, false);\">background</button>";

	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:170px; width:80px;' onclick=\"geraFace(false, true, false, false);\">cor</button>";
	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:86px; width:82px;' onclick=\"geraFace(false, false, true, false);\">shape</button>";
	botoes += "<button style='position:fixed; bottom:36px; height:30px; right:4px; width:80px;' onclick=\"geraFace(false, false, false, true);\">face</button>";

	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:4px; width:80px;' onclick=\"location='logo.html';\">logo</button>";
	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:86px; width:82px;' onclick=\"location='index.html';\">frase</button>";
	botoes += "<button style='position:fixed; bottom:3px; height:30px; right:170px; width:80px;' onclick=\"savelogo();\">save</button></div>";

	document.body.innerHTML = container + botoes;
	ctx = document.getElementById('canvas').getContext('2d');
	ctx.fillStyle="#" + bgcolor;
	ctx.fillRect(0,0,232,232);
	img = new Image();
	img.onload = function() {ctx.drawImage(img, 160 * localStorage.getItem("face-shape"), 160 * localStorage.getItem("face-cor"), 160, 160, 36, 36, 160, 160);};
	img.src = "images/shapes.png";
	img2 = new Image();
	img2.onload = function() {ctx.drawImage(img2, 0, 90 * localStorage.getItem("face-face"), 120, 90, 38 + parseInt(localStorage.getItem("face-pos-y")), 38 + parseInt(localStorage.getItem("face-pos-x")), 120, 90);};
	img2.src = "images/expressions.png";
}

function savelogo(){
	e = document.createElement('a');
	e.href = document.getElementById("canvas").toDataURL('image/png');
	e.download = `avatar-${Date.now()}.png`;
	e.style.display = 'none';
	document.body.appendChild(e);
	e.click();
	document.body.removeChild(e);
}

document.body.onfullscreenchange = function() {
	document.getElementById('botoes').style.display = document.fullscreenElement ? 'none' : '';
}

if(localStorage.getItem("face-nome"))geraFace(false, false, false, false);
else {
	localStorage.setItem("face-nome", "Stylish Gen");
	geraFace(true, true, true, true);
}
