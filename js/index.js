function saveLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

const listUser = getLocalStorage("listUser") || [];
const formIndex = document.getElementById("create-form")
const formLogin = document.getElementById("form-login")
const myModal = new bootstrap.Modal('#register-modal')

const feedBackToastEl = document.getElementById("feedback-toast");
const feedBackToast = new bootstrap.Toast(feedBackToastEl);


function createSuccess() {
     feedBackToastEl.classList.remove("text-bg-danger");
     feedBackToastEl.classList.add("text-bg-success");
     feedBackToastEl.innerHTML = "Usuário cadastrado com sucesso! faça login e acesso seus recados"
     feedBackToast.show();
}

function loginDanger() {
  feedBackToastEl.classList.remove("text-bg-success");
  feedBackToastEl.classList.add("text-bg-danger");
  feedBackToastEl.innerHTML = "Este usuário já está cadastrado!"
  feedBackToast.show();
}

function passwordDanger() {
  feedBackToastEl.classList.remove("text-bg-success");
  feedBackToastEl.classList.add("text-bg-danger");
  feedBackToastEl.innerHTML = "Senhas divergentes!"
  feedBackToast.show();
}

function showDanger(){
   feedBackToastEl.classList.remove("text-bg-success");
   feedBackToastEl.classList.add("text-bg-danger");
   feedBackToastEl.innerHTML = "Verifique seu e-mail e senha!"
   feedBackToast.show();
}


formIndex.addEventListener("submit", function(event) {
  event.preventDefault()

  let newUser = {}

  const emailInput = document.getElementById("email-create-input").value
  const passwordInput = document.getElementById("password-create-input").value
  const repeatPasswordInput = document.getElementById( "repeat-password-create-input").value

  const findUser = listUser.some((usuario) => usuario.email === emailInput)
  
  if(findUser){
    event.target.reset()
    return loginDanger(); 
  }
  if (repeatPasswordInput !== passwordInput) {
    event.target.reset()
    return passwordDanger()
    }     
        
  newUser = {
      email: emailInput,
      password: passwordInput,
      recados: [],
  }
  listUser.push(newUser);

  saveLocalStorage("listUser", listUser)
  createSuccess()
  myModal.hide();     
});


formLogin.addEventListener('submit', function (event){
    event.preventDefault()
    
    const emailLogin = document.getElementById("email-login").value
    const passwordLogin = document.getElementById("password-login").value

   const checkUser = listUser.find((usuario) => usuario.email === emailLogin && usuario.password === passwordLogin)

   if (checkUser){
    saveLocalStorage("userLogged", checkUser)
    
    window.location.href = './home.html'  
   } else{
    showDanger()
    event.target.reset()
   }
})

