from flask import render_template, request, jsonify
from db.db_veterianaria import *

def homectrl():
    return render_template('index.html')

###################### CLIENTES #####################
def clientesctrl():
    return render_template('clientes/listado.html')

def clientectrl():
    return render_template('clientes/registro.html')

def clienteslistactrl():
    data = request.get_json()
    nombre = data["nombre"]
    documento = data["documento"]
    conexionSQL()
    resultado = cliente_lista(nombre, documento)
    return  jsonify( resultado)

def clienteconsultactrl():
    data = request.get_json()
    conexionSQL()
    resultado = cliente_consulta(data)
    return  jsonify( resultado)

def clientesavectrl():
    data = request.get_json()
    id = data["id"] 
    nombre = data["nombre"]
    apellido = data["apellido"]
    tipodocumento = data["tipodocumento"]
    numerodocumento = data["numerodocumento"]
    edad = data["edad"]
    telefono = data["telefono"]   
    conexionSQL()    
    if id != "0":
        cliente_actualiza(id, nombre, apellido, tipodocumento, numerodocumento, edad, telefono)
    else:
        cliente_inserta(nombre, apellido, tipodocumento, numerodocumento, edad, telefono)    
    return jsonify({'mensaje': 'Datos guardados correctamente'})

def clienteelinminactrl():
    data = request.get_json()
    conexionSQL()
    cliente_elimina(data) 
    return jsonify({'mensaje': 'Datos eliminados correctamente'})

###################### MASCOTAS #####################
def mascotasctrl():
    return render_template('mascotas/listado.html')

def mascotactrl():
    return render_template('mascotas/registro.html')

def mascotaslistactrl():
    data = request.get_json()
    nombre = data["nombre"]
    conexionSQL()
    resultado = mascota_lista(nombre)
    return  jsonify( resultado)

def mascotaconsultactrl():
    data = request.get_json()
    conexionSQL()
    resultado = mascota_consulta(data)
    print(resultado)
        
    return  jsonify( resultado)

def mascotasavectrl():
    data = request.get_json()
    id = data["id"] 
    nombre = data["nombre"]
    especie = data["especie"]
    raza = data["raza"]
    edad = data["edad"]
    propietario = data["propietario"]
    telefono = data["telefono"]   
    notas = data["notas"]   
    conexionSQL()    
    if id != "0":
        mascota_actualiza(id, nombre, especie, edad, raza, propietario, telefono, notas)
    else:
        mascota_inserta(nombre, especie, edad, raza, propietario, telefono, notas)    
    return jsonify({'mensaje': 'Datos guardados correctamente'})

def mascotaelinminactrl():
    data = request.get_json()
    conexionSQL()
    mascota_elimina(data) 
    return jsonify({'mensaje': 'Datos eliminados correctamente'})

###################### CITAS #####################
def citasctrl():
    return render_template('citas/listado.html')

def citactrl():
    return render_template('citas/registro.html')

def citaslistactrl():
    data = request.get_json()
    fecha = data["fecha"]
    conexionSQL()
    resultado = cita_lista(fecha)
    return  jsonify( resultado)

def citaconsultactrl():
    data = request.get_json()
    conexionSQL()
    resultado = cita_consulta(data)
    return  jsonify( resultado)

def citasavectrl():
    data = request.get_json()
    id = data["id"] 
    nombreMascota = data["nombreMascota"]
    propietario = data["propietario"]
    fechaCita = data["fechaCita"]
    horaCita = data["horaCita"]
    motivoCita = data["motivoCita"]   
    conexionSQL()    
    if id != "0":
        cita_actualiza(id, nombreMascota, propietario, fechaCita, horaCita, motivoCita)
    else:
        cita_inserta(nombreMascota, propietario, fechaCita, horaCita, motivoCita)    
    return jsonify({'mensaje': 'Datos guardados correctamente'})

def citaelinminactrl():
    data = request.get_json()
    conexionSQL()
    cita_elimina(data) 
    return jsonify({'mensaje': 'Datos eliminados correctamente'})