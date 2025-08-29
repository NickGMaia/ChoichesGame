const dialogoContainer = document.getElementById("dialogoContainer");
const escolhasContainer = document.getElementById("escolhasContainer");
const backgroundElement = document.getElementById("background");

let historia = {};
let cenaAtual = "inicio";
let indiceFalaAtual = 0;
let nomePersonagem = ""; // definido pelo main.js

// Função exportada para receber o nome do personagem
export function setNomePersonagem(nome) {
    nomePersonagem = nome;
}

// Carrega o JSON e inicia o jogo
export async function carregarHistoria() {
    console.log("Carregando história...");
    const response = await fetch("historiaC.json"); 
    historia = await response.json();
    
    mostrarCena(cenaAtual);
}

function mostrarCena(cenaId) {
    console.log(`Mostrando cena: ${cenaId}`);
    indiceFalaAtual = 0;
    cenaAtual = cenaId;
    escolhasContainer.innerHTML = ""; 
    dialogoContainer.addEventListener('click', avancarFala);

    const cena = historia[cenaAtual];

    // Aqui trocamos o fundo assim que a cena começa
    if (cena.fundo) {
        backgroundElement.style.backgroundImage = `url('${cena.fundo}')`;
    }

    avancarFala(); // começa a primeira fala
}

function avancarFala() {
    const cena = historia[cenaAtual];
    
    if (indiceFalaAtual < cena.falas.length) {
        // substitui {{nome}} pelo nome do jogador
        let fala = cena.falas[indiceFalaAtual].replace(/\{\{nome\}\}/g, nomePersonagem);

        dialogoContainer.innerHTML = fala;

        indiceFalaAtual++;
    } else {
        mostrarEscolhas();
    }
}

function mostrarEscolhas() {
    console.log("Mostrando botões de escolha...");
    const cena = historia[cenaAtual];
    
    dialogoContainer.removeEventListener('click', avancarFala);

    if (cena.escolhas && cena.escolhas.length > 0) {
        cena.escolhas.forEach(escolha => {
            const botao = document.createElement('button');
            botao.textContent = escolha.texto;
            botao.className = 'botao-escolha'; 
            botao.onclick = () => mostrarCena(escolha.proxima);
            
            escolhasContainer.appendChild(botao);
        });
    } else {
        const fim = document.createElement("p");
        fim.innerText = "Fim da jornada.";
        escolhasContainer.appendChild(fim);
    }
}
