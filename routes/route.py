from server import app
from controller.control import *

@app.route('/')
def home_page():
    return homectrl()

@app.route('/home')
def home_page2():
    return homectrl()

###################### CLIENTES #####################
@app.route('/clientes')
def clientes():
    return clientesctrl()

@app.route('/clienteslista', methods=["post"])
def clienteslista():
    return clienteslistactrl()

@app.route('/clienteconsulta', methods=["post"])
def clienteconsulta():
    return clienteconsultactrl()

@app.route('/cliente')
def cliente():
    return clientectrl()

@app.route('/clientesave', methods=["post"])
def clientesave():
    return clientesavectrl()

@app.route('/clienteelinmina', methods=["post"])
def clienteelinmina():
    return clienteelinminactrl()

###################### MASCOTAS #####################
@app.route('/mascotas')
def mascotas():
    return mascotasctrl()

@app.route('/mascotaslista', methods=["post"])
def mascotaslista():
    return mascotaslistactrl()

@app.route('/mascotaconsulta', methods=["post"])
def mascotaconsulta():
    return mascotaconsultactrl()

@app.route('/mascota')
def mascota():
    return mascotactrl()

@app.route('/mascotasave', methods=["post"])
def mascotasave():
    return mascotasavectrl()

@app.route('/mascotaelinmina', methods=["post"])
def mascotaelinmina():
    return mascotaelinminactrl()

###################### CITAS #####################
@app.route('/citas')
def citas():
    return citasctrl()

@app.route('/citaslista', methods=["post"])
def citaslista():
    return citaslistactrl()

@app.route('/citaconsulta', methods=["post"])
def citaconsulta():
    return citaconsultactrl()

@app.route('/cita')
def cita():
    return citactrl()

@app.route('/citasave', methods=["post"])
def citasave():
    return citasavectrl()

@app.route('/citaelinmina', methods=["post"])
def citaelinmina():
    return citaelinminactrl()