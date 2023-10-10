function Listar() {
    filtros={
        documento:document.getElementById("filtrodocumento").value,
        nombre:document.getElementById("filtrnombre").value
    };
    fetch('/clienteslista', {
        method: 'post',
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(filtros)
    })
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tbRegistros");
            const tbody = tabla.querySelector("tbody");
            tbody.innerHTML = "";

            data.forEach(function (cliente) {
                const fila = document.createElement("tr");

                fila.innerHTML = `<td>${cliente.nombre}</td>
                    <td>${cliente.apellido}</td>
                    <td>${cliente.tipodocumento}  ${cliente.numerodocumento}</td>
                    <td class="tdCenter">
                    <button class="btn btn_edit" onclick="Editar(${cliente.id})"><i class="fa fa-pen"></i></button>
                    <button class="btn btn_trash" onclick="Eliminar(${cliente.id}, '${cliente.tipodocumento}  ${cliente.numerodocumento}')"><i class="fa fa-trash"></i></button></td>`;
                tbody.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });    
}
function Adicionar() {
    location.href = '/cliente';
}
function Cargar() {
    const urlParams = new URLSearchParams(window.location.search);
    const parametro = urlParams.get('r');

    if(parametro === null)
        return;

    let objetoEncontrado = null;

    fetch('/clienteconsulta', {
        method: 'post',
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(parametro)
    })
        .then(response => response.json())
        .then(data => { 
            objetoEncontrado = data[0]; 
            if (objetoEncontrado) {
                document.getElementById('id').value = objetoEncontrado.id;
                document.getElementById('nombre').value = objetoEncontrado.nombre;
                document.getElementById('apellido').value = objetoEncontrado.apellido;
                document.getElementById('tipodocumento').value = objetoEncontrado.tipodocumento;
                document.getElementById('numerodocumento').value = objetoEncontrado.numerodocumento;
                document.getElementById('edad').value = objetoEncontrado.edad;
                document.getElementById('telefono').value = objetoEncontrado.telefono;
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos al servidor:', error);
        });    
}
function Editar(index) {
    location.href = '/cliente?r=' + index;
}
function Eliminar(index, documento) {    
    var opcion = confirm("Va a eliminar el registro del documento «"+ documento+ "». Desea continuar?");
    if (opcion == true) {
        fetch('/clienteelinmina', {
            method: 'post',
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(index)
        })
            .then(response => response.json())
            .then(data => { 
                alert("Registro eliminado con exito");
                location.href = '/clientes';
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
    valido = (ValidaObligatorio("apellido") ? ValidaTexto("apellido") : false) && valido;
    valido = ValidaObligatorio("tipodocumento") && valido;
    valido = (ValidaObligatorio("numerodocumento") ? ValidaNumerico("numerodocumento") : false) && valido;
    valido = ValidaNumerico("edad") && valido;
    valido = ValidaNumerico("telefono") && valido;

    if (!valido)
        return false;

    data = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        tipodocumento: document.getElementById("tipodocumento").value,
        numerodocumento: document.getElementById("numerodocumento").value,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value
    };

    fetch('/clientesave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) // Si el servidor devuelve una respuesta en JSON, puedes parsearla aquí
    .then(data => {
        alert("Registro guardado con exito");
        location.href = '/clientes';
    })
    .catch(error => {
        alert('Error al enviar los datos al servidor:'+ error);
    });   
    return false;
}
function Cancelar(index) {
    location.href = '/clientes';
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