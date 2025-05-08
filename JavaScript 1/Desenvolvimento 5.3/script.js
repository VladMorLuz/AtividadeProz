document.body.innerHTML += `<h1 id="titulo">Minha Loja Virtual</h1>`;

const produto = document.createElement("div");
produto.setAttribute("id", "produto");
produto.style.border = "1px solid #ccc";
produto.style.padding = "16px";
produto.style.marginTop = "10px";
produto.style.maxWidth = "300px";
produto.style.fontFamily = "Arial";

const nome = document.createElement("h2");
nome.innerText = "Camisa Básica";

const descricao = document.createElement("p");
descricao.innerText = "Camisa 100% algodão, ideal para o dia a dia.";

const preco = document.createElement("p");
preco.innerText = "R$ 49,90";
preco.style.fontWeight = "bold";

const imagem = document.createElement("img");
imagem.src = "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lyeweyi1a6c5b2";
imagem.alt = "Imagem do Produto";
imagem.style.width = "100%";
imagem.style.marginBottom = "10px";

produto.appendChild(imagem);
produto.appendChild(nome);
produto.appendChild(descricao);
produto.appendChild(preco);

document.body.appendChild(produto);
