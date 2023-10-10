function Listar() {
    filtros={
        fecha: document.getElementById("filtrofecha").value
    };
    fetch('/citaslista', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtros)
    })
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tbRegistros");
            const tbody = tabla.querySelector("tbody");
            tbody.innerHTML = "";

            data.forEach(function (cita) {
                const fila = document.createElement("tr");

                fila.innerHTML = `<td>${cita.nombreMascota}</td>
                    <td>${cita.propietario}</td>
                    <td>${cita.fechaCita}  ${cita.horaCita}</td>
                    <td>${cita.motivoCita}</td>
                    <td class="tdCenter">
                    <button class="btn btn_edit" onclick="Editar(${cita.id})"><i class="fa fa-clock"></i></button>
                    <button class="btn btn_trash" onclick="Eliminar(${cita.id}, '${cita.nombreMascota}')"><i class="fa fa-calendar-minus"></i></button></td>`;
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });
}
function Adicionar() {
    location.href = '/cita';
}
function Cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    const parametro = urlParams.get('r');

    if (parametro === null)
        return;

    let objetoEncontrado = null;

    fetch('/citaconsulta', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parametro)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            objetoEncontrado = data[0]; 
            if (objetoEncontrado) {
                document.getElementById('id').value = objetoEncontrado.id;
                document.getElementById('nombreMascota').value = objetoEncontrado.nombreMascota;
                document.getElementById('propietario').value = objetoEncontrado.propietario;
                document.getElementById('fechaCita').value = objetoEncontrado.fechaCita;
                document.getElementById('horaCita').value = objetoEncontrado.horaCita;
                document.getElementById('motivoCita').value = objetoEncontrado.motivoCita;
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });
}
function Editar(index) {
    location.href = '/cita?r=' + index;
}
function Eliminar(index, mascota) {
    var opcion = confirm("Va a eliminar la cita  de la mascota «"+ mascota+ "». Desea continuar?");
    if (opcion == true) {
        fetch('/citaelinmina', {
            method: 'post',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(index)
        })
            .then(response => response.json())
            .then(data => { 
                alert("Registro eliminado con exito");
                location.href = '/citas';
            })
            .catch(error => {
                console.error('Error al enviar los datos al servidor:', error);
            });
    }
    return;
}
function Guardar(index) {
    var valido = true;

    valido = ValidaObligatorio("nombreMascota") ? ValidaTexto("nombreMascota") : false;
    valido = (ValidaObligatorio("propietario") ? ValidaTexto("propietario") : false) && valido;
    valido = ValidaObligatorio("fechaCita") && valido;
    valido = (ValidaObligatorio("horaCita") ? ValidaHora("horaCita") : false) && valido;

    if (!valido)
        return false;

        data = {
            id: document.getElementById("id").value,
            nombreMascota: document.getElementById("nombreMascota").value,
            propietario: document.getElementById("propietario").value,
            fechaCita: document.getElementById("fechaCita").value,
            horaCita: document.getElementById("horaCita").value,
            motivoCita: document.getElementById("motivoCita").value
        };

        fetch('/citasave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Si el servidor devuelve una respuesta en JSON, puedes parsearla aquí
        .then(data => {
            alert("Registro guardado con exito");
            location.href = '/citas';
        })
        .catch(error => {
            alert('Error al enviar los datos al servidor:'+ error);
        });   
        return false;

    alert("Registro agendado con exito");
    location.href = '/citas';
    return false;
}
function Cancelar(index) {
    location.href = '/citas';
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
function ValidaHora(campo) {
    var valido = (/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/i.test(document.getElementById(campo).value));
    MuestraError(valido, "err" + campo, "Hora inválida");
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