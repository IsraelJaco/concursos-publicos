const categoria = localStorage.getItem("categoria");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const audio = document.getElementById("audio");

fetch("perguntas.json")
  .then(res => res.json())
  .then(data => {
    const perguntas = data[categoria];
    let indexAtual = 0;

    // Tocar áudio da categoria
    audio.src = `sons/${categoria.toLowerCase()}.mp3`;
    audio.play();

    function mostrarPergunta() {
      const p = perguntas[indexAtual];
      perguntaEl.textContent = p.pergunta;
      opcoesEl.innerHTML = "";

      p.opcoes.forEach((opcao, i) => {
        const btn = document.createElement("button");
        btn.textContent = opcao;
        btn.onclick = () => {
          if (i === p.correta) {
            btn.classList.add("correto");
          } else {
            btn.classList.add("errado");
          }

          setTimeout(() => {
            indexAtual++;
            if (indexAtual < perguntas.length) {
              mostrarPergunta();
            } else {
              perguntaEl.textContent = "Parabéns! Terminaste o quiz.";
              opcoesEl.innerHTML = "";
            }
          }, 1000);
        };
        opcoesEl.appendChild(btn);
      });
    }

    mostrarPergunta();
  });
