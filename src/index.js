if(localStorage.getItem("tema") != "tema-lua.css") {
	localStorage.setItem("tema", "tema-sol.css");
}

function anexacss() {
  lnk = document.createElement('link');
  lnk.rel = 'stylesheet';
  lnk.type = 'text/css';
  lnk.href = 'src/' + localStorage.getItem("tema");
  document.head.appendChild(lnk);

  document.getElementById('tema').innerHTML = localStorage.getItem("tema") != "tema-lua.css" ? "☾" : "☼";
  document.getElementById('tema').onclick = localStorage.getItem("tema") != "tema-lua.css" ? temalua : temasol;
}
anexacss();

function temasol() {
  localStorage.setItem("tema", "tema-sol.css");
  anexacss();
}
function temalua() {
  localStorage.setItem("tema", "tema-lua.css");
  anexacss();
}

function main() {
  procedimento = parseInt(location.hash.substring(1));

  if (!(procedimento > -1 && procedimento < procedimentos.length)) {
    procedimento = -1;
  }

  if (procedimento == -1) {
    listacategorias('todos');
  }
  else {
    scrollTo(0, 0);

    fetch("conteudo/snippet" + procedimento + ".html").then(function(response){return response.text();}).then(function(data) {
      conteudo = '';
      etapas = data.split('\n');

      for (x = 0; x < etapas.length; x++) {
        eval('etapas[' + x + ']=`' + etapas[x] + '`;');
      }

      for (x = 0; x < etapas.length; x++) {
        conteudo += etapas[x].replace("<h2>", "<article><h2>" + posicao(x)) + "<br></article><br>";
      }

      document.getElementById("main").innerHTML = conteudo;
      Prism.highlightAll();
    })
    .catch(error => {
      document.getElementById("main").innerHTML = "<br><br><br><center>...<br><br>impossivel httprequest sem servidor<br><br>...</center><br><br><br>";
    });
  }
}

function listacategorias(c) {
  conteudo = "<div class=links><a onclick=\"listacategorias('w');\">web</a> &nbsp; <a onclick=\"listacategorias('d');\">desktop</a> &nbsp; <a onclick=\"listacategorias('m');\">mobile</a> &nbsp; <img src='src/dice.png' id='dice' onclick=\"location.hash=parseInt(Math.random()*procedimentos.length);\"></div><br>";
  animacao = 0;

  for (x = 0; x < procedimentos.length; x++) {
    if (c == "todos" || procedimentos[x][6] == c) {
      if (procedimentos[x][6] != 'e') {
        conteudo += cardprocedimento(x);
      }
    }
  }

  conteudo += "<h3>Informação Adicional Extra</h3>";
  conteudo += cardprocedimento(17);
  conteudo += cardprocedimento(21);
  conteudo += "<article " + anima(x) + " onclick=\"location.href='https://RodrigoSchioMuniz.github.io/perceptron';\" class='card'><h2>Como programar uma i.a.</h2><span class=badge> * Tutorial Externo</span><br><br><div class=subtitulo><a>Inteligência Artficial desde o zero</a></div>Um tutorial sobre machine learning com códigos e conceitos sobre criação de inteligência artificial<br><br><div class=links><a>Conheça os fundamentos</a></div></article>";

  document.getElementById("main").innerHTML = conteudo;
}

function anima(x) {
  return "style='animation:pisca 7s " + (animacao++ % 7) + "s infinite;'";
}

function direciona(x) {
  return "onclick=\"location.hash='" + x + "';\"";
}

function titulo(x) {
  return "<h2>" + procedimentos[x][0] + "</h2>";
}

function linguagem(x) {
  return "<span class=badge> * Linguagem " + procedimentos[x][2] + " &nbsp; </span><br><br>";
}

function subtitulo(x) {
  return "<div class=subtitulo><a>" + procedimentos[x][4] + "</a></div>";
}

function botoes(x) {
  return "<div class=links><a>" + procedimentos[x][3] + "</a> &nbsp; <a>" + procedimentos[x][1] + "</a></div>";
}

function cardprocedimento(x) {
  return "<article " + anima(x) + " " + direciona(x) + " class='" + procedimentos[x][6] + " card'>" + titulo(x) + linguagem(x) + subtitulo(x) + procedimentos[x][5] + "<br><br>" + botoes(x) + "</article>";
}

function posicao(x) {
  return "<span class=badge>" + (x * 10 + parseInt(Math.random() * 10)) + "." + parseInt(Math.random() * 10) + "</span>&nbsp;&nbsp;";
}

procedimentos = [
  ["Joe Jumper", "Desktop", "C", "Iniciantes", "Programação Joguinho Simples", "Programando um jogo com a linguagem C. Comandos setvideomode() dos-like dos.h dos.c sleep() setcolor()", "d"],
  ["Zombie Waves", "Mobile", "Java", "Intermediários", "Tutorial Jogo de Celular", "Como programar um jogo para android com a linguagem Java. Comandos 'extends View()' onTouchEvent() onDraw() onSizeChanged() TimerTask()", "m"],
  ["Xadrez", "Browser", "Javascript", "Avançados", "Tutorial Xadrez em Javascript", "Como programar um jogo de xadrez com a linguagem javascript", "w"],
  ["Database", "Server", "Php", "Intermediários", "Tutorial Banco de Dados", "Como iniciar com php e mysql. Comandos básicos de php. Criando uma base de dados mysql com xampp", "w"],
  ["Campo Minado", "Mobile", "Java", "Intermediários", "Tutorial Jogo de Celular", "Como programar um jogo de celular. Programação javascript e java. Usando uma webview", "m"],
  ["Jogo de Corrida", "Desktop", "Javascript", "Avançados", "Tutorial Jogo em Javascript", "Como programar um jogo com javascript. Um jogo de corrida no canvas. Como usar setTimeout e context.rotate()", "d"],
  ["Stylish-Gen", "Front End", "CSS - JS", "Iniciantes", "Tutorial Stylish-Gen", "Tutorial que mostra como programar uma página simples que gera estilos aleatórios para frases que o usuário digita", "w"],
  ["Breakout", "Browser", "Javascript", "Intermediários", "Tutorial Breakout Js", "Tutorial programação javascript. Jogo breakout. Arrays. Jogo. Como criar um joguinho em javascript com a tag canvas", "w"],
  ["Square Motor", "Mobile", "Kotlin", "Avançados", "Tutorial Square Motor", "Tutorial sobre programação mobile android. Um jogo de corrida programado com a linguagem kotlin", "m"],
  ["Site Simples", "Web", "HTML", "Iniciantes", "Tutorial como criar um site", "Tutorial sobre como escrever código html. Criando uma simples página", "w"],
  ["Endless Runner", "Desktop", "Python", "Iniciantes", "Tutorial Endless Runner", "Tutorial sobre como programar um joguinho com python. Um joguinho simples", "d"],
  ["Snake", "Desktop", "C", "Avançados", "Tutorial jogo Cobrinha", "Como programar o jogo da cobrinha com a linguagem C usando o Dev-C++", "d"],
  ["Rocket Attack", "Desktop", "hta", "Avançados", "Joguinho de corrida de Naves", "Como programar um jogo para windows. Jogo de corrida com javascript. Arquivo no formato hta", "d"],
  ["Screenshot", "Mobile", "Java", "Intermediários", "Tutorial Screenshot Android", "Como desenvolver um aplicativo que tira screenshot e salva com png. Programação Android com java", "m"],
  ["Shuffle Faces", "Desktop", "hta", "Intermediários", "Tutorial joguinho de encontrar", "Programação joguinho windows. Arquivo javascript executável. Como programar um arquivo hta", "d"],
  ["Harry Leap", "Mobile", "Java", "Intermediários", "Programar Jogo usando o celular", "Tutorial que mostra como fazer um game programando pelo celular", "m"],
  ["Números Primos", "Web", "Javascript", "Iniciantes", "Calculando números primos", "Tutorial sobre programação javascript. Como calcular números primos", "w"],
  ["Armazenamento", "Desktop", "Textos e Imagens", "Iniciantes", "Como o computador armazena", "Explicação detalhada de como os computadores armazenam informações", "e"],
  ["Site Instalável", "Desktop", "PWA", "Iniciantes", "Progressive Web Application", "Como programar e publish uma página PWA", "d"],
  ["Everywhere", "Desktop", "hta", "Intermediários", "Jogo de desviar dos objetos", "Usando javascript html e css para programar um joguinho que funciona em computadores com windows", "d"],
  ["Empurrador de Caixas", "Desktop", "C", "Avançados", "Programar no software Poly", "Comandos e conceitos básicos sobre desenvolvimento de games", "d"],
  ["Criptografia RSA", "Web", "Textos e Imagens", "Avançados", "Protocolo de Comunicação", "Nas requisições pela internet um algoritmo interessante impede intermediários de acessarem dados", "e"]
];

main();