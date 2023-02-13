import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");

inputs.forEach( inputs => {
    inputs.addEventListener("blur", (input) => {
        valida(input.target);
    })
})