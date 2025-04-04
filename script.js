// Definindo os heróis com suas imagens e imagens "clicadas"
const herois = [
    { nome: "guerreiro", imagem: "imagens/herois/guerreiro-base.png", imagemClick: "imagens/herois/guerreiro-click.png" },
    { nome: "assassino", imagem: "imagens/herois/assassino-base.png", imagemClick: "imagens/herois/assassino-click.png" },
    { nome: "mago", imagem: "imagens/herois/mago-base.png", imagemClick: "imagens/herois/mago-click.png" },
    { nome: "bardo", imagem: "imagens/herois/bardo-base.png", imagemClick: "imagens/herois/bardo-click.png" },
    { nome: "barbaro", imagem: "imagens/herois/barbaro-base.png", imagemClick: "imagens/herois/barbaro-click.png" },
    { nome: "coala", imagem: "imagens/herois/coala-base.png", imagemClick: "imagens/herois/coala-click.png" }
];

// Lista de vilões
const viloes = [
    { nome: "dragao", imagem: "imagens/viloes/dragao-base.png" },
    { nome: "goblin", imagem: "imagens/viloes/goblin-base.png" },
    { nome: "lich", imagem: "imagens/viloes/lich-base.png" },
    { nome: "morte", imagem: "imagens/viloes/morte-base.png" },
    { nome: "serpente", imagem: "imagens/viloes/serpente-base.png" },
    { nome: "lobo", imagem: "imagens/viloes/lobo-base.png" },
    { nome: "morcego", imagem: "imagens/viloes/morcego-base.png" }
];

let heroisEscolhidos = [];

// Função para selecionar/deselecionar heróis
document.querySelectorAll('.character-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const nome = button.getAttribute('data-name');
        const heroi = herois.find(h => h.nome === nome);

        const index = heroisEscolhidos.findIndex(h => h.nome === nome);

        // Se não estiver selecionado e a lista de heróis escolhidos for menor que 3
        if (index === -1 && heroisEscolhidos.length < 3) {
            heroisEscolhidos.push(heroi);
            button.classList.add('selected');
        } else if (index !== -1) {
            heroisEscolhidos.splice(index, 1);
            button.classList.remove('selected');
        }

        // Exibe o botão "Jogar" se 3 heróis forem selecionados
        document.getElementById('play-button').style.display = heroisEscolhidos.length === 3 ? 'block' : 'none';
    });
});

// Função para escolher vilões aleatórios
function escolherViloes() {
    const viloesEscolhidos = [];
    while (viloesEscolhidos.length < 3) {
        const vilao = viloes[Math.floor(Math.random() * viloes.length)];
        if (!viloesEscolhidos.includes(vilao)) {
            viloesEscolhidos.push(vilao);
        }
    }
    return viloesEscolhidos;
}

// Função para rolar o dado
function rolarDado() {
    return Math.floor(Math.random() * 10) + 1;
}

// Função para calcular a força dos personagens
function calcularForca(personagens) {
    return personagens.map(personagem => {
        const forcaPersonagem = rolarDado();
        personagem.forca = forcaPersonagem;
        return personagem;
    });
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Limpa a seleção de heróis
    heroisEscolhidos = [];
    document.querySelectorAll('.character-btn').forEach((button) => {
        button.classList.remove('selected');
    });

    // Esconde as telas de batalha e mostra a tela inicial
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('battle-screen').style.display = 'none';
    document.getElementById('battle-result').innerHTML = "";

    // Esconde o botão de reiniciar e o botão de jogar
    document.getElementById('battle-button-container').style.display = 'none';
    document.getElementById('play-button').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
}

// Função para iniciar a batalha
document.getElementById('play-button').addEventListener('click', function() {
    // Esconde a tela de seleção de heróis e exibe a tela de batalha
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'block';

    // Escolhe vilões aleatórios
    const viloesEscolhidos = escolherViloes();

    const playerTeamDiv = document.getElementById('player-team');
    const computerTeamDiv = document.getElementById('computer-team');

    // Exibe os heróis do jogador com a imagem "-click.png"
    playerTeamDiv.innerHTML = "<h3>Seu Time</h3>";
    heroisEscolhidos.forEach(heroi => {
        // Substitui a imagem base pela imagem "clicada"
        playerTeamDiv.innerHTML += `<img src="${heroi.imagemClick}" alt="${heroi.nome}">`;
    });

    // Exibe os vilões aleatórios
    computerTeamDiv.innerHTML = "<h3>Time dos Vilões</h3>";
    viloesEscolhidos.forEach(vilao => {
        computerTeamDiv.innerHTML += `<img src="${vilao.imagem}" alt="${vilao.nome}">`;
    });

    // Exibe o botão de rolar os dados
    document.getElementById('battle-button-container').style.display = 'block';
});


// Função para rolar os dados e calcular a força
document.getElementById('battle-button').addEventListener('click', function() {
    const viloesEscolhidos = escolherViloes();
    const heroisComForca = calcularForca(heroisEscolhidos);
    const viloesComForca = calcularForca(viloesEscolhidos);

    const forcaTotalHeróis = heroisComForca.reduce((acc, h) => acc + h.forca, 0);
    const forcaTotalViloes = viloesComForca.reduce((acc, v) => acc + v.forca, 0);

    let resultadoHTML = "<h2>Batalha de Forças</h2>";
    resultadoHTML += `<p><strong>Força Total dos Heróis: </strong>${forcaTotalHeróis}</p>`;
    resultadoHTML += `<p><strong>Força Total dos Vilões: </strong>${forcaTotalViloes}</p>`;

    if (forcaTotalHeróis > forcaTotalViloes) {
        resultadoHTML += "<h2>🎉 Heróis Venceram! 🎉</h2>";
    } else {
        resultadoHTML += "<h2>😢 Vilões Venceram! 😢</h2>";
    }

    document.getElementById('battle-result').innerHTML = resultadoHTML;
    document.getElementById('battle-button-container').style.display = 'none';

    // Exibe o botão de reiniciar o jogo
    document.getElementById('restart-button').style.display = 'block';
});

// Evento de clique no botão de reiniciar
document.getElementById('restart-button').addEventListener('click', reiniciarJogo);
