import './Input.css'
const InputElem = (type, placeholder, id, clas = '') => {
  const InputElem = `
    <input type="${type}" placeholder="${placeholder}" id="${id}" class="${clas} Imp">
    </input>
    `
  return InputElem
}

export default InputElem
