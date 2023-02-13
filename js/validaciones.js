export function valida(input) {
    const tipodeInput = input.dataset.tipo;
    if (validadores[tipodeInput])
    {
        validadores[tipodeInput](input);
    }

    if (input.validity.valid)
    {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = monstrarMensajeDeError(tipodeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede estar vacia",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "El campo numero no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros"
    },
    direccion: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
    },
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function monstrarMensajeDeError(tipodeInput, input)
{
    let mensaje = ""
    tipoDeErrores.forEach ( error => {
        if(input.validity[error])
        {
           mensaje = mensajesDeError[tipodeInput][error];
        }
    })
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente))
    {
        mensaje = "Debes tener al menos 18 años de edad."
    }

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
};