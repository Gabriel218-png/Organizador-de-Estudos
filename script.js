let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("form");
const lista = document.getElementById("lista");

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrarTarefas() {
    lista.innerHTML = "";

    let concluidas = 0;

    for (let i = 0; i < tarefas.length; i++) {
        let tarefa = tarefas[i];

        if (tarefa.concluida) {
            concluidas++;
        }

        let li = document.createElement("li");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        li.textContent =
            tarefa.disciplina + " - " +
            tarefa.descricao + " | Prioridade: " +
            tarefa.prioridade + " ";

        let concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Desmarcar"
            : "Concluir";

        concluir.onclick = function () {
            tarefa.concluida = !tarefa.concluida;
            salvar();
            mostrarTarefas();
        };

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");

        excluir.onclick = function () {
            tarefas.splice(i, 1);
            salvar();
            mostrarTarefas();
        };

        li.appendChild(concluir);
        li.appendChild(excluir);
        lista.appendChild(li);
    }

    document.getElementById("total").textContent = tarefas.length;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent =
        tarefas.length - concluidas;
}

form.onsubmit = function (evento) {
    evento.preventDefault();

    let disciplina = document.getElementById("disciplina").value;
    let descricao = document.getElementById("descricao").value;
    let prioridade = document.getElementById("prioridade").value;

    tarefas.push({
        disciplina: disciplina,
        descricao: descricao,
        prioridade: prioridade,
        concluida: false
    });

    salvar();
    mostrarTarefas();
    form.reset();
};

mostrarTarefas();

