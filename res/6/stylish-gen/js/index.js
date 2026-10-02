let lngPtBr = true;

function pickOne(atributo) {
	return atributo[parseInt(Math.random() * atributo.length)];
}

function telaEdicao() {
	let htmtextarea = "<textarea id=frase>"+localStorage.getItem("index-userfrase")+"</textarea>";
	let htmbotao = "<a onclick='geraStilo(false, false, false, false);'>stylize</a>";
	document.body.innerHTML="<div id=edicao>" + htmtextarea + "<br>" + htmbotao + "</div>";
}

function geraStilo(randomfrase, cor, fonte, quadro, bg){
	if(document.getElementById('frase')) {
		localStorage.setItem("index-frase", document.getElementById('frase').value);
	}

	if(document.getElementById('frase')) {
		localStorage.setItem("index-userfrase", document.getElementById('frase').value);
	}

	if(randomfrase) {
		if(lngPtBr) {
			localStorage.setItem("index-frase", pickOne(citacoes));
		}
		else {
			localStorage.setItem("index-frase", pickOne(quotes));
		}
	}

	if(cor) {
		localStorage.setItem("index-bgcolor", pickOne(cores));

		let valorR = parseInt(localStorage.getItem("index-bgcolor")[0], 16);
		let valorG = parseInt(localStorage.getItem("index-bgcolor")[2], 16);
		let valorB = parseInt(localStorage.getItem("index-bgcolor")[4], 16);

		if(valorR + valorG + valorB > 24)
			localStorage.setItem("index-fontcolor", true);
		else
			localStorage.setItem("index-fontcolor", false);
	}

	if(fonte) {
		localStorage.setItem("index-font-family", pickOne(["Architects Daughter", "Montserrat", "Poppins", "Roboto Mono", "Rubik", "Secular One"]));
		localStorage.setItem("index-font-size", pickOne([15, 18, 21, 24, 27, 30, 33]));
		localStorage.setItem("index-text-align", pickOne(["left", "right", "center"]));
		localStorage.setItem("index-text-transform", pickOne(["lowercase", "uppercase", "capitalize", "none"]));
	}

	if(quadro) {
		localStorage.setItem("index-border-radius", pickOne([3, 6, 9, 12, 15, 18]));
		localStorage.setItem("index-padding", pickOne([14, 18, 22, 26, 30, 34, 38]));
		localStorage.setItem("index-frame-preenchido", Math.random() < .4);
		localStorage.setItem("index-tracado-borda", Math.random() < .5);
		localStorage.setItem("index-estilo-borda", pickOne(["solid", "dashed"]));
		localStorage.setItem("index-inclinacao", Math.random() > .8);
		localStorage.setItem("index-angulo", pickOne(["346", "353", "7", "14"]));
		localStorage.setItem("index-sombra", Math.random() > .8);
	}

	if(bg) {
		localStorage.setItem("index-bg", parseInt(Math.random()*60));
	}

	let bgcolor = localStorage.getItem("index-bgcolor");
	let fontcolor = localStorage.getItem("index-fontcolor");

	let atrmoldura = "padding:0px 34px; width:100vw; height:100vh; background-image:url('texturas/" + localStorage.getItem("index-bg") + ".png'); background-color:#" + bgcolor + "; display:flex; align-items:center; justify-content:center;";
	let atrFrame = "animation:entrada 1s; max-width:400px; color:#" + (fontcolor == "true" ? "222222" : "dddddd") + ";";

	let moldura="<div style=\"" + atrmoldura + "\">";
	moldura+="<div style=\"" + atrFrame;

	moldura += "border-radius:" + localStorage.getItem("index-border-radius") + "px;";
	moldura += "font-family:'" + localStorage.getItem("index-font-family") + "';";
	moldura += "font-size:" + localStorage.getItem("index-font-size") + "px;";
	moldura += "padding:" + localStorage.getItem("index-padding") + "px;";
	moldura += "text-align:" + localStorage.getItem("index-text-align") + ";";
	moldura += "text-transform:" + localStorage.getItem("index-text-transform") + ";";

	if(localStorage.getItem("index-bg") < 40 || localStorage.getItem("index-frame-preenchido") == "true") {
		moldura += bgototom(bgcolor);

		if(fontcolor == "true" && localStorage.getItem("index-sombra") == "true")
			moldura += " box-shadow: 8px 8px 0px 0px  #" + (fontcolor == "true" ? "222222" : "dddddd") + ";";
	}
	else {
		if(localStorage.getItem("index-tracado-borda") == "true") {
			moldura += "border:2px " + localStorage.getItem("index-estilo-borda") + " #" + (fontcolor=="true" ? "222222" : "dddddd") + ";";
		}
	}

	if(localStorage.getItem("index-inclinacao") == "true") {
		moldura += "transform:rotate(" + localStorage.getItem("index-angulo") + "deg);";
	}

	let stylebutton = "background-color:#" + bgcolor + "; border: 1px solid #" + (fontcolor == "true" ? "222222" : "dddddd") + "; color:#" + (fontcolor == "true" ? "222222" : "dddddd") + "; position:fixed;";
	let botoes = "<div id=botoes>";
	botoes += "<button style='" + stylebutton + " bottom:69px; height:30px; right:170px; width:80px;' onclick=\"geraStilo(true, true, true, true, true);\">outro "+(lngPtBr?"pt":"en")+"</button>";
	botoes += "<button style='" + stylebutton + " bottom:69px; height:30px; right:86px; width:82px;' onclick=\"geraStilo(false, true, true, true, true);\">outro</button>";
	botoes += "<button style='" + stylebutton + " bottom:69px; height:30px; right:4px; width:80px;' onclick=\"telaEdicao();\">editar</button>";

	botoes += "<button style='" + stylebutton + " bottom:36px; height:30px; right:190px; width:60px;' onclick=\"geraStilo(false, true, false, false, false);\">cor</button>";
	botoes += "<button style='" + stylebutton + " bottom:36px; height:30px; right:128px; width:60px;' onclick=\"geraStilo(false, false, true, false, false);\">text</button>";
	botoes += "<button style='" + stylebutton + " bottom:36px; height:30px; right:66px; width:60px;' onclick=\"geraStilo(false, false, false, true, false);\">frame</button>";
	botoes += "<button style='" + stylebutton + " bottom:36px; height:30px; right:4px; width:60px;' onclick=\"geraStilo(false, false, false, false, true);\">bg</button>";

	botoes += "<button style='" + stylebutton + " bottom:3px; height:30px; right:4px; width:48px;' onclick=\"document.body.requestFullscreen();\">full</button>";
	botoes += "<button style='" + stylebutton + " bottom:3px; height:30px; right:54px; width:48px;' onclick=\"location='face.html';\">face</button>";
	botoes += "<button style='" + stylebutton + " bottom:3px; height:30px; right:104px; width:48px;' onclick=\"location='logo.html';\">logo</button>";
	botoes += "<button style='" + stylebutton + " bottom:3px; height:30px; right:154px; width:48px;' onclick=\"lngPtBr=false;geraStilo(true, false, false, false);\">en</button>";
	botoes += "<button style='" + stylebutton + " bottom:3px; height:30px; right:204px; width:48px;' onclick=\"lngPtBr=true;geraStilo(true, false, false, false);\">pt</button></div>";

	document.body.innerHTML = moldura + "\">" + localStorage.getItem("index-frase").replace(/\</g, '&lt;').replace(/\n/g, '<br>').replace(/  /g, ' &nbsp;')+"</div></div>" + botoes;
}

let hexas = "0123456789abcdef";
let hclara = "5567899abcddefff";
let hescura = "00012234566789aa";

function ototom(c) {
	for(let x = 0; x < 16; x++) {
		if(c == hexas[x]) {
			return localStorage.getItem("index-fontcolor") == "true" ? hclara[x] : hescura[x];
		}
	}
}

function bgototom(bgcolor) {
	return "background-color:#" + ototom(bgcolor[0]) + bgcolor[1] + ototom(bgcolor[2]) + bgcolor[3] + ototom(bgcolor[4]) + bgcolor[5] + ";";
}

document.body.onfullscreenchange = function() {
	document.getElementById('botoes').style.display = document.fullscreenElement ? 'none' : '';
}

if(localStorage.getItem("index-frase")) {
	geraStilo(false, false, false, false, false);
}
else {
	localStorage.setItem("index-userfrase", "");
	localStorage.setItem("index-frase", "You cannot derive an ought from an is");
	geraStilo(false, true, true, true, true);
}
