window.addEventListener("load", function(){

let formulario = document.querySelector("form.fromAltaUSR");

formulario.addEventListener("submit",function(e){
    
    let erroresRegister=[];

    //First_Name
    let campoName = document.querySelector("input.campoFirstName_Register");
    if(campoName.value.length <= 2 ){
        erroresRegister.push("El nombre es obligatorio y debe tener al menos 2 caracteres");
    };

    
    //Last_Name
    let campoLastName = document.querySelector("input.campoLastName_Register");
    if(campoLastName.value.length <= 2 ){
        erroresRegister.push("El Apellido es obligatorio y debe tener al menos 2 caracteres");
    };

    
    //Email valido
    let campoEmail = document.querySelector("input.campoEmail_Register");
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!expr.test(campoEmail.value) ){
        erroresRegister.push("La direccion de correo ingresada no es valida");
    };
    

    //Contraseña
    let campoContrasena_Register = document.querySelector("input.campoContrasena_Register");
    let campoConfirmarContrasena_Register = document.querySelector("input.campoConfirmarContrasena_Register");


    if( (campoContrasena_Register.value.length <= 8 ) && (campoContrasena_Register.value != campoConfirmarContrasena_Register.value ) )  {
        erroresRegister.push("La contraseña ingresada es invalida o no coinciden");
    };

    
    
    // imagen
    let campoImagen = document.querySelector("input.campoImagen_register");
    let exten = campoImagen.value.substr(campoImagen.value.length-4,4);
    if(exten == ".jpg" || exten == ".png"  || exten == "jpeg"){
        //imagen correcta
    }else{
        erroresRegister.push("Imagen invalida");
    };
  

    

    if (erroresRegister.length >0){
        e.preventDefault();

    let ulErroresRegister = document.querySelector("div.erroresRegister ul");
    for (let i=0;i<erroresRegister.length;i++){
        ulErroresRegister.innerHTML +="<li>"+ erroresRegister[i] +"</li>" ;  
    }

    }



})

})

