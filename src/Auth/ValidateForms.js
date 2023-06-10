export const ValidateForms = (name) => {
    let field = document.getElementsByName(name)
    let value = field[0].value
    return value
}