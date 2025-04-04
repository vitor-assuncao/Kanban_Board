# Kanban Board com HTML, CSS e JavaScript

Este projeto é um quadro Kanban funcional, construído apenas com tecnologias web: **HTML**, **CSS** e **JavaScript puro**. Ele permite **criar, mover, editar e excluir tarefas** com armazenamento local e uma interface responsiva e amigável.

---

## 🔧 Funcionalidades
- Criação de tarefas em "A Fazer"
- Edição de tarefas com duplo clique
- Exclusão de tarefas com confirmação
- Movimentação de tarefas via **drag & drop**
- Armazenamento persistente com `localStorage`
- Alternância entre modo claro 🌞 e escuro 🌙

---

## 🧠 Principais Componentes

### Estrutura HTML
Três colunas:
- A Fazer (`todo`)
- Fazendo (`doing`)
- Feito (`done`)

### Armazenamento Local
As tarefas são salvas no navegador usando `localStorage`, mantendo o estado mesmo após recarregar a página.

---

## 🎯 Destaque: Sistema de Drag and Drop

### 📥 Função `dragStart`
Captura o texto da tarefa e a coluna de origem:
```js
e.dataTransfer.setData('text/plain', e.target.querySelector('span').textContent);
e.dataTransfer.setData('source', e.target.parentElement.closest('.column').dataset.status);
```
Isso permite saber **qual tarefa está sendo movida** e de onde.

### 📤 Função `drop`

Quando a tarefa é solta sobre outra coluna:
- Remove da coluna anterior
- Cria um novo elemento de tarefa e adiciona à nova coluna
- Atualiza o `localStorage`

```js
const sourceStatus = e.dataTransfer.getData('source');
const text = e.dataTransfer.getData('text/plain');
const task = createTask(text);
...
sourceCol.querySelectorAll('.task span').forEach(...);
col.querySelector('.tasks').appendChild(task);
saveBoard();
```

### 💡 Detalhe importante
Em vez de mover o DOM diretamente, o código **recria o elemento** com `createTask()`. Isso evita problemas com eventos perdidos ou referências quebradas.

### 💎 UX extra
- Realce visual com a classe `.drag-over`
- Feedback instantâneo com troca de estilo ao arrastar

---

## 🌙 Tema Escuro
O botão "Modo Escuro" alterna a classe `dark` no `body`. Os estilos no CSS se adaptam com base nisso.

---

## ▶️ Como Usar
1. Abra o `index.html` em qualquer navegador
2. Adicione tarefas e mova com drag and drop
3. Clique duas vezes para editar, ou no "✕" para excluir
4. Clique no botão 🌙 para alternar o tema

---

## 🛠️ Tecnologias Usadas
- HTML5
- CSS3 (com transições e responsividade)
- JavaScript (ES6+)

---

## 📂 Estrutura de Arquivos
```
📁 kanban-board/
├── index.html
├── style.css
└── script.js
```

---

## 📌 Melhorias Futuras
- Múltiplos quadros
- Exportar/importar tarefas JSON


---

## 📜 Licença
Este projeto está sob licença MIT — sinta-se livre para usar e modificar!
