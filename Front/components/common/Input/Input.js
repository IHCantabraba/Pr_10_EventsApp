import './Input.css'
const InputElem = (type, placeholder, id, clas = '', required = '') => {
  const InputElem = `
    <input type="${type}" placeholder="${placeholder}" id="${id}" class="${clas} Imp" ${required}>
    </input>
    `
  return InputElem
}

export default InputElem
