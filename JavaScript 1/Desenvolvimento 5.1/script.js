const titulo = document.getElementById('titulo');
const listaNaoOrdenada = document.querySelector('ul');
const link = document.querySelector('a');
const listaOrdenada = document.getElementById('lista-ordenada');

titulo.innerText = "Eis o titulo";
link.innerText = "Visite a Proz Educação";

listaNaoOrdenada.innerHTML = `
  <li>Primeiro item</li>
  <li>Segundo item</li>
  <li>Terceiro item</li>
`;

listaOrdenada.innerHTML = `
  <li><a href="https://www.google.com" target="_blank">Google</a></li>
  <li><a href="https://www.youtube.com" target="_blank">YouTube</a></li>
  <li><a href="https://www.wikipedia.org" target="_blank">Wikipedia</a></li>
`;
