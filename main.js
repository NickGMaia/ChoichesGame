
import { carregarHistoria, setNomePersonagem } from './comandos.js';

const nomesRegistrados = [];
let personagemSelecionado = "";


document.querySelectorAll(".card").forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.disabled) {
            alert("Esta classe ainda está bloqueada.");
            return; 
        }
        personagemSelecionado = botao.id;
        console.log(`Classe selecionada: ${personagemSelecionado}`);

        document.getElementById("tela-classe").style.display = "none";
        document.getElementById("menuNome").style.display = "block";
    });
});

// Função que é chamada quando o botão "Confirmar Nome" é clicado
function confirmarNome() {
    const nomeInput = document.getElementById("inputNome");
    const nome = nomeInput.value.trim();

    if (nome === "") {
        alert("Digite um nome");
        return;
    }
    if (nomesRegistrados.includes(nome)) {
        alert("Nome já registrado");
        return;
    }

    nomesRegistrados.push(nome);
    console.log(`Nome confirmado: ${nome}`);

    setNomePersonagem(nome);
    document.getElementById("menuNome").style.display = "none";
    document.getElementById("tela-jogo").style.display = "block";

    carregarHistoria();

    alert(`Personagem "${personagemSelecionado}" nomeado como "${nome}"`);
}

document.getElementById("btnConfirmarNome").addEventListener("click", confirmarNome);
