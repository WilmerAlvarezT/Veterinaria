from pymysql import MySQLError, connect

user = "root"
password = "1234"
db_name = "db_veterinaria"
ip = "localhost"
connection = ""

def conexionSQL():
    try:
        global connection 
        connection = connect(host=ip,
                             user=user,
                             password=password,
                             db=db_name)
    except MySQLError as ex:
        print(ex)

###################### CLIENTES #####################
def cliente_lista(nombre, documento):
    try:
        sqlnombre = f""" where (nombre like '%{nombre}%' or apellidos like '%{nombre}%') """
        sqldocumento = (f""" and documento = '{documento}' ""","")[len(documento)==0]

        instruction = "select id, nombre, apellidos, tipo_documento, documento, edad, telefono from clientes " + sqlnombre + sqldocumento
        print(instruction)
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombre': nombre, 'apellido': apellidos, 'tipodocumento': tipo_documento, 'numerodocumento': documento, 'edad': edad, 'telefono': telefono} for id, nombre, apellidos, tipo_documento, documento, edad, telefono  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)

def cliente_consulta(id):
    try:
        instruction = "select id, nombre, apellidos, tipo_documento, documento, edad, telefono from clientes where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombre': nombre, 'apellido': apellidos, 'tipodocumento': tipo_documento, 'numerodocumento': documento, 'edad': edad, 'telefono': telefono} for id, nombre, apellidos, tipo_documento, documento, edad, telefono  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)        

def cliente_inserta(nombre, apellidos, tipo_documento, documento, edad, telefono):
    try:
        instruction = f"""insert into clientes (nombre, apellidos, tipo_documento, documento, edad, telefono) 
                        values ('{nombre}', '{apellidos}', '{tipo_documento}', '{documento}', {edad}, '{telefono}')"""
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cliente guardado exitosomente")
    except MySQLError as ex:
        print(ex)

def cliente_actualiza(id, nombre, apellidos, tipo_documento, documento, edad, telefono):
    try:
        instruction = f"""update clientes 
                            set nombre='{nombre}', 
                                apellidos='{apellidos}', 
                                tipo_documento = '{tipo_documento}', 
                                documento='{documento}', 
                                edad= {edad}, 
                                telefono='{telefono}'
                            where id = {id};"""
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cliente actualizado exitosomente")
    except MySQLError as ex:
        print(ex)   

def cliente_elimina(id):
    try:
        print("apunto de eliminar el id ")
        print(id)
        instruction = "delete from clientes where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cliente elinminado exitosomente")
    except MySQLError as ex:
        print(ex)       

###################### MASCOTAS #####################
def mascota_lista(nombre):
    try:
        sqlnombre = f""" where nombre like '%{nombre}%' """

        instruction = "select id, nombre, especie, edad, raza, propietario, telefono, notas from mascotas " + sqlnombre 
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombre': nombre, 'especie': especie, 'edad': edad, 'raza': raza, 'propietario': propietario, 'telefono': telefono, 'notas': notas} for id, nombre, especie, edad, raza, propietario, telefono, notas  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)

def mascota_consulta(id):
    try:
        instruction = "select id, nombre, especie, edad, raza, propietario, telefono, notas from mascotas where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombre': nombre, 'especie': especie, 'edad': edad, 'raza': raza, 'propietario': propietario, 'telefono': telefono, 'notas': notas} for id, nombre, especie, edad, raza, propietario, telefono, notas  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)        

def mascota_inserta(nombre, especie, edad, raza, propietario, telefono, notas):
    try:
        instruction = f"""insert into mascotas ( nombre, especie, edad, raza, propietario, telefono, notas) 
                        values ('{nombre}', '{especie}', {edad}, '{raza}', '{propietario}', '{telefono}', '{notas}')"""
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("mascota guardada exitosomente")
    except MySQLError as ex:
        print(ex)

def mascota_actualiza(id, nombre, especie, edad, raza, propietario, telefono, notas):
    try:
        instruction = f"""update mascotas 
                            set nombre='{nombre}', 
                                especie='{especie}', 
                                edad = {edad}, 
                                raza='{raza}', 
                                propietario= '{propietario}', 
                                telefono='{telefono}', 
                                notas='{notas}'
                            where id = {id};"""
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("mascota actualizada exitosamente")
    except MySQLError as ex:
        print(ex)   

def mascota_elimina(id):
    try:
        instruction = "delete from mascotas where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("mascota elinminada con exito")
    except MySQLError as ex:
        print(ex)           
     
###################### CITAS #####################
def cita_lista(fecha):
    try:
        sqlnombre = f""" where fechaCita like '%{fecha}%' """

        instruction = "select id, nombreMascota, propietario, date_format(fechaCita, '%Y-%m-%d') fechaCita, date_format(horaCita, '%H:%i') horaCita, motivoCita from citas " + sqlnombre 
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombreMascota': nombreMascota, 'propietario': propietario, 'fechaCita': fechaCita, 'horaCita': horaCita, 'motivoCita': motivoCita} for id, nombreMascota, propietario, fechaCita, horaCita, motivoCita  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)

def cita_consulta(id):
    try:
        instruction = "select id, nombreMascota, propietario, date_format(fechaCita, '%Y-%m-%d') fechaCita, date_format(horaCita, '%H:%i') horaCita, motivoCita from citas where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        resultados = cursor.fetchall()
        datos_json = [{'id': id, 'nombreMascota': nombreMascota, 'propietario': propietario, 'fechaCita': fechaCita, 'horaCita': horaCita, 'motivoCita': motivoCita} for id, nombreMascota, propietario, fechaCita, horaCita, motivoCita  in resultados]
        
        return datos_json
    except MySQLError as ex:
        print(ex)        

def cita_inserta(nombreMascota, propietario, fechaCita, horaCita, motivoCita):
    try:
        instruction = f"""insert into citas (nombreMascota, propietario, fechaCita, horaCita, motivoCita ) 
                        values ('{nombreMascota}', '{propietario}', '{fechaCita}', '{horaCita}', '{motivoCita}')"""
        print("cita_insrtar instruction")
        print(instruction)
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cita guardada con exito")
    except MySQLError as ex:
        print(ex)

def cita_actualiza(id, nombreMascota, propietario, fechaCita, horaCita, motivoCita):
    try:
        instruction = f"""update citas 
                            set nombreMascota='{nombreMascota}', 
                                propietario='{propietario}', 
                                fechaCita = '{fechaCita}', 
                                horaCita='{horaCita}', 
                                motivoCita= '{motivoCita}'
                            where id = {id};"""
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cita actualizada exitosomente")
    except MySQLError as ex:
        print(ex)   

def cita_elimina(id):
    try:
        print("apunto de eliminar el id ")
        print(id)
        instruction = "delete from citas where id = " + str(id)
        cursor = connection.cursor()
        cursor.execute(instruction)
        connection.commit()
        print("cita elinminada exitosomente")
    except MySQLError as ex:
        print(ex)       
