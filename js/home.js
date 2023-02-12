function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

const userLogged = getLocalStorage("userLogged");

const listUser = getLocalStorage("listUser")

document.addEventListener("DOMContentLoaded", function(){

   if (!userLogged){
    alert("Você precisa estar logado para acessar essa página")
    window.location.href = "./index.html"  
   }

})

const formRecados = document.getElementById("recados-form");

formRecados.addEventListener ("submit", function(event) {
  event.preventDefault()
  
  const description = document.getElementById("input-description").value
  const detalhamento = document.getElementById("input-detalhamento").value

  const novoRecado = {
    description: description,
    detalhamento: detalhamento,
  };

  userLogged.recados.push(novoRecado);


  event.target.reset()
  saveOnStorage();
  renderTable();

});

function saveOnStorage() {
  localStorage.setItem("userLogged", JSON.stringify(userLogged));

  const findUser = listUser.findIndex((usuario) => usuario.email === userLogged.email) 

  listUser[findUser] = userLogged

  localStorage.setItem("listUser", JSON.stringify(listUser));
}


function renderTable () {

  let recadosHtml = ``;
  userLogged.recados.map((user, index) => {
     recadosHtml += `
          <tr>
              <th class="m-1" scope="row">${index + 1}</th>
              <td class="m-1">${user.description}</td>
              <td class="m-1">${user.detalhamento}</td>
              <td>
                  <button onclick="deleteErrand(${index})" data-bs-target="#modalDelete" class="col-12 col-md-3 col-lg-3 mb-1 btn btn-primary btn-success" type="button">Apagar</button>
                  <button onclick="editErrand(${index})" class="col-12 col-md-3 col-lg-3 mb-1 btn btn-primary btn-danger" type="button">Editar</button>
              </td>
          </tr>
      `
})
      document.getElementById("recados-list").innerHTML = recadosHtml;
}
renderTable();

function deleteErrand(index) {

  const confirmaDelete = confirm("Deseja excluir o recado?")

  if(confirmaDelete){
    userLogged.recados.splice(index, 1);
    renderTable();
    saveOnStorage()
  }
}

function editErrand(index) {
  const newDescricao = prompt("Digite descrição");
  const novoDetalhamento = prompt("Digite o recado");


  userLogged.recados[index].description = newDescricao;
  userLogged.recados[index].detalhamento = novoDetalhamento;

  renderTable();
  saveOnStorage();
}

const exit = document.getElementById('button-exit')
exit.addEventListener('click', () => {

    localStorage.removeItem('userLogged')

    window.location.href = './index.html'
})

