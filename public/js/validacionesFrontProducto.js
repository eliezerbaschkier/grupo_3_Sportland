window.addEventListener("load", function(){

let formulario = document.querySelector("form.formAltaProducto");

formulario.addEventListener("submit",function(e){
    
    let erroresProducto=[];

    
    let campoName = document.querySelector("input.campoName_altaProd");
    if(campoName.value.length <= 5 ){
        erroresProducto.push("El nombre del producto no puede estar vacio y debe contener al menos 5 caracteres");
    };

    let campoDescripcion = document.querySelector("input.campoDescripcion_altaProd");
    if(campoDescripcion.value.length <= 20 ){
        erroresProducto.push("La descripcion debe contener al menos 20 caracteres");
    };

    if (erroresProducto.length >0){
        e.preventDefault();

    let ulErroresProducto = document.querySelector("div.erroresProducto ul");
    for (let i=0;i<erroresProducto.length;i++){
        ulErroresProducto.innerHTML +="<li>"+ erroresProducto[i] +"</li>" ;  
    }

    }



})

})

