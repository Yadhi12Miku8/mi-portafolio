// ------------------------------------
// SIMULACIÓN DE USUARIOS
// ------------------------------------
const users = [
  { username: "admin", password: "admin123", role: "admin", name:"Administrador" },
  { username: "invitado", password: "1234", role: "guest", name:"Invitado" }
];

// ------------------------------------
// LOGIN
// ------------------------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const user = users.find(u => u.username === username && u.password === password);
    
    if(user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "portafolio.html";
    } else {
      document.getElementById("errorMsg").innerText = "Usuario o contraseña incorrectos";
    }
  });
}

// ------------------------------------
// PORTAFOLIO
// ------------------------------------
const adminPanel = document.getElementById("adminPanel");
const filesList = document.getElementById("filesList");
const logoutBtn = document.getElementById("logoutBtn");

// Recuperar usuario
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Mostrar panel admin si es admin
if(adminPanel && currentUser?.role === "admin") {
  adminPanel.classList.remove("hidden");
}

// Mostrar logout si usuario logeado
if(logoutBtn && currentUser) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

// LISTA DE ARCHIVOS
let files = JSON.parse(localStorage.getItem("files")) || [];

// Renderizar archivos
function renderFiles() {
  filesList.innerHTML = "";
  files.forEach((file, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${file.url}" target="_blank">${file.name}</a>`;
    if(currentUser?.role === "admin"){
      const delBtn = document.createElement("button");
      delBtn.textContent = "Eliminar";
      delBtn.onclick = () => {
        files.splice(index,1);
        localStorage.setItem("files", JSON.stringify(files));
        renderFiles();
      };
      li.appendChild(delBtn);
    }
    filesList.appendChild(li);
  });
}
renderFiles();

// SUBIR ARCHIVO (simulación)
const uploadForm = document.getElementById("uploadForm");
if(uploadForm) {
  uploadForm.addEventListener("submit", e => {
    e.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if(file) {
      const fileURL = URL.createObjectURL(file);
      files.push({ name:file.name, url:fileURL });
      localStorage.setItem("files", JSON.stringify(files));
      renderFiles();
      fileInput.value = "";
    }
  });
}

// ------------------------------------
// TYPING HERO
// ------------------------------------
const typewriter = document.getElementById("typewriter");
if(typewriter){
  const text = "¡Hola! Soy Yadhi, diseñadora y programadora web.";
  let i = 0;
  function type() {
    if(i < text.length) {
      typewriter.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 60);
    }
  }
  type();
}

// ------------------------------------
// ANIMACIÓN BARRAS HABILIDADES
// ------------------------------------
document.querySelectorAll(".skill").forEach(skill => {
  const percent = skill.dataset.percent;
  skill.querySelector(".bar-fill").style.setProperty("--target", percent + "%");
});
