export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInpu](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "CustomError"
]


const mensajesDeError = {
    nombre:{
        valueMissing: "El campo 'Nombre' no puede estar vacio"
    },
    email:{
        valueMissing: "El campo 'email' no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password:{
        valueMissing: "El campo 'contraseña' no puede estar vacio",
        patternMismatch: "Min. 6 caracteres Max.12 debe contener 1 letra minuscula, 1 letra mayuscula, 1 numero y no puede contener caracteres especiales!"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        CustomError: "Debes tener al menos 18 años de edad!"
    }
}
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad!";

    }
    input.setCustomValidity(mensaje)
}
function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate());
    return diferenciaFechas < fechaActual;
}