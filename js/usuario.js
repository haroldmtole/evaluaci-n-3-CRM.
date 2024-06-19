//variable global
var g_id_usuario="";

function agregarUsuario(){
  // variables con datos de formulario
  var id_usuario = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email= document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var usuario = document.getElementById("txt_username").value;
  var contraseña = document.getElementById("txt_password").value;

  if ((dv >= 0 && dv <= 9) || dv.toUpperCase() === 'k') {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var fechaHoraActual = obtenerFechaHora();

    const raw = JSON.stringify({
      "id_usuario": id_usuario,
      "dv": dv,
      "nombres": nombres,
      "apellidos": apellidos,
      "email": email,
      "celular": celular,
      "username": usuario,
      "password": contraseña,
      "fecha_registro": fechaHoraActual
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
   .then((response) => {
      if(response.status == 200){
        alert("Usuario creado correctamente");
        location.href="listar.html";
      }
      if(response.status == 400){
        alert("Error al agregar usuario falta uno o mas datos");
      }
    })
   .then((result) => console.log(result))
   .catch((error) => console.error(error));
  } else {
    alert("El DV debe ser un número entre 0 y 9 o la letra 'k'");
  }
}
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element, index, arr){
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a> 
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosActualizar(p_id_usuario);
}

function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}

function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiqueta))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/" + p_id_usuario, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormulario))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarEtiqueta(element, index, arr){
  var nombre_usuario = element.nombres;
  var apellido_usuario = element.apellidos;
  var nombre_completo = (nombre_usuario +" "+ apellido_usuario)
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este usuario?<b> " + nombre_completo + "</b>";
}

function completarFormulario(element, index, arr){
  var id_usuario = element.id_usuario;
  var dv = element.dv
  var nombre_usuario = element.nombres;
  var apellido_usuario = element.apellidos;
  var correo_usuario = element.email;
  var telefono_usuario = element.celular;
  var usuario = element.username;
  var contraseña_usuario = element.password;
  document.getElementById('txt_id_usuario').value = id_usuario;
  document.getElementById('txt_dv').value = dv;
  document.getElementById('txt_nombres').value = nombre_usuario;
  document.getElementById('txt_apellidos').value = apellido_usuario;
  document.getElementById('txt_email').value = correo_usuario;
  document.getElementById('txt_celular').value = telefono_usuario;
  document.getElementById('txt_username').value = usuario;
  document.getElementById('txt_password').value = contraseña_usuario;
}

function actualizarUsuario(){
  // Obtenemos valor del tipo de gestion desde el formulario
  var id_usuario = document.getElementById("txt_id_usuario").value;
  var dv = document.getElementById("txt_dv").value;
  var nombres = document.getElementById("txt_nombres").value;
  var apellidos = document.getElementById("txt_apellidos").value;
  var email= document.getElementById("txt_email").value;
  var celular = document.getElementById("txt_celular").value;
  var usuario = document.getElementById("txt_username").value;
  var contraseña = document.getElementById("txt_password").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_usuario": id_usuario,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "username":usuario,
    "password": contraseña
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        alert("Usuario actualizado correctamente")
        location.href="listar.html";
      }
      if(response.status == 400){
        alert("Error al actualizar usuario");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function eliminarUsuario(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
    .then((response) => {
      if(response.status == 200){
        alert("Usuario eliminado correctamente")
        location.href="listar.html";
      }
      if(response.status == 400){
        alert("Error al eliminar usuario");
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerFechaHora(){
  var fechaActual = new Date();
  var fechaFormateada = fechaActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
return fechaFormateada;
}