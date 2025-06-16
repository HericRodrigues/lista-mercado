const form = document.getElementById('form-adicionar');
const inputItem = document.getElementById('input-item');
const inputPreco = document.getElementById('input-preco');
const listaItens = document.getElementById('lista-de-itens');
const listaItensPegos = document.getElementById('lista-de-itens-pego');
const totalSpan = document.getElementById('total');
const botaoLimpar = document.getElementById('botao-limpar');
const mensagemVazia = document.getElementById('mensagem-vazia');

let total = 0;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeItem = inputItem.value.trim();
    const precoItem = parseFloat(inputPreco.value);

    if (nomeItem === '' || isNaN(precoItem) || precoItem < 0) {
        alert('Preencha corretamente o nome e o preço do item.');
        return;
    }

    adicionarItem(nomeItem, precoItem);
    inputItem.value = '';
    inputPreco.value = '';
});

function adicionarItem(nome, preco) {
    const li = document.createElement('li');

    const texto = document.createElement('span');
    texto.textContent = `${nome} - R$ ${preco.toFixed(2)}`;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '🗑️';
    botaoRemover.title = 'Remover';
    botaoRemover.addEventListener('click', () => {
        li.remove();
        total -= preco;
        atualizarTotal();
        checarListaVazia();
    });

    const botaoPego = document.createElement('button');
    botaoPego.textContent = '✔️';
    botaoPego.title = 'Marcar como pego';
    botaoPego.addEventListener('click', () => {
        li.remove();
        listaItensPegos.appendChild(li);
        li.removeChild(botaoPego);
        total -= preco;
        atualizarTotal();
        checarListaVazia();
    });

    li.appendChild(texto);
    li.appendChild(botaoPego);
    li.appendChild(botaoRemover);

    listaItens.appendChild(li);

    total += preco;
    atualizarTotal();
    checarListaVazia();
}

botaoLimpar.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar a lista?')) {
        listaItens.innerHTML = '';
        listaItensPegos.innerHTML = '';
        total = 0;
        atualizarTotal();
        checarListaVazia();
    }
});

function atualizarTotal() {
    totalSpan.textContent = total.toFixed(2);
}

function checarListaVazia() {
    mensagemVazia.style.display = listaItens.children.length === 0 ? 'block' : 'none';
}
