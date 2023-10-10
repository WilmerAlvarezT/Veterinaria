function Listar() {
    filtros={
        nombre: document.getElementById("filtrnombre").value
    };
    fetch('/mascotaslista', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtros)
    })
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tbRegistros");
            const tbody = tabla.querySelector("tbody");
            tbody.innerHTML = "";

            data.forEach(function (mascota) {
                const fila = document.createElement("tr");

                var especie = "";
                switch (mascota.especie) {
                    case "Ave":
                        especie = '<i class="fas fa-dove icongrid"></i>';
                        break;
                    case "Gato":
                        especie = '<i class="fas fa-cat icongrid"></i>';
                        break;
                    case "Perro":
                        especie = '<i class="fas fa-dog icongrid"></i>';
                        break;
                    case "Roedor":
                        especie = '<i class="fa-sharp fa-solid fa-squirrel icongrid"></i>';
                        break;
                    case "Pez":
                        especie = "<i class='fas fa-fish icongrid'></i>";
                        break;
                    default:
                        break;
                }
                fila.innerHTML = `<td>${mascota.nombre}</td>
                <td>${especie} ${mascota.especie}</td>
                <td>${mascota.edad}</td><td class="tdCenter">
                
                <button class="btn btn_edit" onclick="Editar(${mascota.id})"><i class="fa fa-pen"></i></button>
                <button class="btn btn_trash" onclick="Eliminar(${mascota.id}, '${mascota.nombre}')"><i class="fa fa-trash"></i></button></td>`;
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });
}
function Adicionar() {
    location.href = '/mascota';
}
function Cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    const parametro = urlParams.get('r');
    if (parametro === null)
        return;

    let objetoEncontrado = null;

    fetch('/mascotaconsulta', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametro)
    })
        .then(response => response.json())
        .then(data => {
            objetoEncontrado = data[0]; 
            console.log(objetoEncontrado);
            if (objetoEncontrado) {
                document.getElementById('id').value = objetoEncontrado.id;
                document.getElementById('nombre').value = objetoEncontrado.nombre;
                document.getElementById('edad').value = objetoEncontrado.edad;
                document.getElementById('especie').value = objetoEncontrado.especie;
                document.getElementById('raza').value = objetoEncontrado.raza;
                document.getElementById('propietario').value = objetoEncontrado.propietario;
                document.getElementById('telefono').value = objetoEncontrado.telefono;
                document.getElementById('notas').value = objetoEncontrado.notas;
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });
}
function Editar(index) {
    location.href = '/mascota?r=' + index;
}
function Eliminar(index, nombre) {
    var opcion = confirm("Va a eliminar la mascota de nombre «"+ nombre+ "». Desea continuar?");
    if (opcion == true) {
        fetch('/mascotaelinmina', {
            method: 'post',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(index)
        })
            .then(response => response.json())
            .then(data => { 
                alert("Registro eliminado con exito");
                location.href = '/mascotas';
            })
            .catch(error => {
                console.error('Error al enviar los datos al servidor:', error);
            });    

	}
    return;
}
function Guardar(index) {
    var valido = true;

    valido = ValidaObligatorio("nombre") ? ValidaTexto("nombre") : false;
    valido = ValidaNumerico("edad") && valido;
    valido = (ValidaObligatorio("especie") ? ValidaTexto("especie") : false) && valido;
    valido = (ValidaObligatorio("propietario") ? ValidaTexto("propietario") : false) && valido;
    valido = ValidaNumerico("telefono") && valido;

    if (!valido)
        return false;

        data = {
            id: document.getElementById("id").value,
            nombre: document.getElementById("nombre").value,
            especie: document.getElementById("especie").value,
            raza: document.getElementById("raza").value,
            edad: document.getElementById("edad").value,
            propietario: document.getElementById("propietario").value,
            telefono: document.getElementById("telefono").value,
            notas: document.getElementById("notas").value
        };

        fetch('/mascotasave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Si el servidor devuelve una respuesta en JSON, puedes parsearla aquí
        .then(data => {
            alert("Registro guardado con exito");
            location.href = '/mascotas';
        })
        .catch(error => {
            alert('Error al enviar los datos al servidor:'+ error);
        });   
        return false;
}
function Cancelar(index) {
    location.href = '/mascotas';
    return false;
}

function ValidaObligatorio(campo) {
    var valido = (document.getElementById(campo).value !== "");
    MuestraError(valido, "err" + campo, "Valor obligatorio");
    return valido;
}
function ValidaTexto(campo) {
    var valido = (/^[A-Za-z\s]+$/i.test(document.getElementById(campo).value));
    MuestraError(valido, "err" + campo, "Texto inválido");
    return valido;
}
function ValidaNumerico(campo) {
    var valido = (/^[0-9]*$/i.test(document.getElementById(campo).value));
    MuestraError(valido, "err" + campo, "Número inválido");
    return valido;
}
function MuestraError(valido, campo, mensaje) {
    document.getElementById(campo).classList.add("hidden");
    if (!valido) {
        document.getElementById(campo).classList.remove("hidden");
        document.getElementById(campo).setAttribute("title", mensaje);
        document.getElementById(campo).innerHTML = mensaje;
    }
}