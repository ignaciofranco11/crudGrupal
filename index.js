let buscar = document.getElementById("btnGet1");
let resultado = document.getElementById("results");
let btnPost = document.getElementById("btnPost")
let inputPostNombre = document.getElementById("inputPostNombre");
let inputPostApellido = document.getElementById("inputPostApellido");
let btnModificar = document.getElementById("btnPut");
let inputPutID = document.getElementById("inputPutId");
let inputModalNombre = document.getElementById("nombreModal");
let inputModalApellido = document.getElementById("apellidoModal");
let btnModal = document.getElementById("guardarModal");
let inputDelete = document.getElementById("inputDelete");
let btnDelete = document.getElementById("btnDelete");

let botones = document.getElementsByClassName("boton");



document.getElementById("post-box").addEventListener("change", function () {
    if (!(inputPostNombre.value.trim() == "" || inputPostApellido.value.trim() == "")) {
        btnPost.removeAttribute("disabled", "");
    } else if (inputPostNombre.value.trim() == "" || inputPostApellido.value.trim() == "") {
        btnPost.setAttribute("disabled", "");
    }
})

document.getElementById("put-box").addEventListener("change", function () {
    if (!(inputPutID.value.trim() == "")) {
        btnModificar.removeAttribute("disabled", "");
    } else if (inputPutID.value.trim() == "") {
        btnModificar.setAttribute("disabled", "");
    }
})

document.getElementById("delete-box").addEventListener("change", function () {
    if (!(inputDelete.value.trim() == "")) {
        btnDelete.removeAttribute("disabled", "");
    } else if (inputDelete.value.trim() == "") {
        btnDelete.setAttribute("disabled", "");
    }
})

buscar.addEventListener("click", function () {

    if (document.getElementById("inputGet1Id").value.trim() == "") {
        fetch("https://655686e584b36e3a431fdd37.mockapi.io/users")
            .then(res => res.json())
            .then(data => {
                let content = "";
                for (let usuario of data) {
                    content += `<li>
<p>ID: ${usuario.id}</p>
<p>NAME: ${usuario.name}</p>
<p>LAST NAME: ${usuario.lastname}</p>
</li>`
                }
                resultado.innerHTML = content;
            })
    } else {
        fetch("https://655686e584b36e3a431fdd37.mockapi.io/users/" + document.getElementById("inputGet1Id").value.trim())
            .then(res => res.json())
            .then(data => {
                let content = "";
                content += `<li>
<p>ID: ${data.id}</p>
<p>NAME: ${data.name}</p>
<p>LAST NAME: ${data.lastname}</p>
</li>`

                resultado.innerHTML = content;
            }
            )
    }
})

btnPost.addEventListener("click", function () {
    let cuerpo = { name: inputPostNombre.value, lastname: inputPostApellido.value }

    // Primer fetch para agregar un nuevo usuario
    fetch("https://655686e584b36e3a431fdd37.mockapi.io/users", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => {
            return fetch("https://655686e584b36e3a431fdd37.mockapi.io/users");
        })
        .then(res => res.json())
        .then(data => {
            let content = "";
            for (let usuario of data) {
                content += `<li>
                <p>ID: ${usuario.id}</p>
                <p>NAME: ${usuario.name}</p>
                <p>LAST NAME: ${usuario.lastname}</p>
            </li>`;
            }
            resultado.innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

btnModificar.addEventListener("click", function () {

    let valorID = inputPutID.value
    fetch("https://655686e584b36e3a431fdd37.mockapi.io/users/" + valorID.trim())
        .then(res => res.json())
        .then(data => {
            inputModalNombre.value = data.name
            inputModalApellido.value = data.lastname
        })

})

btnModal.addEventListener("click", function () {
    let valorID = inputPutID.value
    let cuerpo = { name: inputModalNombre.value, lastname: inputModalApellido.value }
    fetch("https://655686e584b36e3a431fdd37.mockapi.io/users/" + valorID, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cuerpo),
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => {
            return fetch("https://655686e584b36e3a431fdd37.mockapi.io/users");
        })
        .then(res => res.json())
        .then(data => {
            let content = "";
            for (let usuario of data) {
                content += `<li>
                <p>ID: ${usuario.id}</p>
                <p>NAME: ${usuario.name}</p>
                <p>LAST NAME: ${usuario.lastname}</p>
            </li>`;
            }
            resultado.innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


btnDelete.addEventListener("click", function () {
    let valorID = inputDelete.value
    fetch("https://655686e584b36e3a431fdd37.mockapi.io/users/" + valorID, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        mode: "cors"
    })
        .then(res => res.json())
        .then(data => {
            return fetch("https://655686e584b36e3a431fdd37.mockapi.io/users");
        })
        .then(res => res.json())
        .then(data => {
            let content = "";
            for (let usuario of data) {
                content += `<li>
                <p>ID: ${usuario.id}</p>
                <p>NAME: ${usuario.name}</p>
                <p>LAST NAME: ${usuario.lastname}</p>
            </li>`;
            }
            resultado.innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
        });
})