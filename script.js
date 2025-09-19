// ==========================
// 🎬 EFECTO MAQUINA DE ESCRIBIR EN HERO
// ==========================
const typewriter = document.getElementById("typewriter");
if (typewriter) {
  const text = typewriter.textContent;
  typewriter.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(typing, 100);
    }
  }
  typing();
}

// ==========================
// 🔑 LOGIN (login.html)
// ==========================
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (!username || !password) {
    error.textContent = "⚠️ Completa todos los campos.";
    return;
  }

  // Rol administrador
  if (username === "admin" && password === "1234") {
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("username", username);
    window.location.href = "portafolio.html";
  }
  // Rol usuario
  else if (username === "usuario" && password === "1234") {
    localStorage.setItem("userRole", "user");
    localStorage.setItem("username", username);
    window.location.href = "portafolio.html";
  }
  else {
    error.textContent = "❌ Usuario o contraseña incorrectos.";
  }
}

// ==========================
// 📂 PORTAFOLIO (portafolio.html)
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const filesList = document.getElementById("filesList");
  const uploadArea = document.getElementById("uploadArea");

  if (filesList && uploadArea) {
    const role = localStorage.getItem("userRole");

    // Mostrar área de subida solo a admin
    if (role === "admin") {
      uploadArea.style.display = "block";
    } else {
      uploadArea.style.display = "none";
    }

    // Archivos simulados (se guardan en localStorage)
    let files = JSON.parse(localStorage.getItem("portfolioFiles")) || [];

    function renderFiles() {
      filesList.innerHTML = "";
      if (files.length === 0) {
        filesList.innerHTML = "<p>No hay archivos en el portafolio.</p>";
      } else {
        files.forEach((file, index) => {
          const li = document.createElement("li");
          li.className = "file-item";

          li.innerHTML = `
            <span>📄 ${file.name}</span>
            <div>
              <a href="${file.url}" download class="btn small">Descargar</a>
              ${
                role === "admin"
                  ? `<button class="btn small danger" onclick="deleteFile(${index})">Eliminar</button>`
                  : ""
              }
            </div>
          `;

          filesList.appendChild(li);
        });
      }
    }

    renderFiles();

    // ==========================
    // 📤 SUBIR ARCHIVO (solo admin)
    // ==========================
    window.uploadFile = function () {
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];

      if (!file) {
        alert("⚠️ Selecciona un archivo primero.");
        return;
      }

      const newFile = {
        name: file.name,
        url: URL.createObjectURL(file),
      };

      files.push(newFile);
      localStorage.setItem("portfolioFiles", JSON.stringify(files));
      renderFiles();
      fileInput.value = "";
    };

    // ==========================
    // 🗑 ELIMINAR ARCHIVO (solo admin)
    // ==========================
    window.deleteFile = function (index) {
      if (confirm("¿Seguro que quieres eliminar este archivo?")) {
        files.splice(index, 1);
        localStorage.setItem("portfolioFiles", JSON.stringify(files));
        renderFiles();
      }
    };
  }
});


