import './button.css'
const BtnType = (id, text, clas) => {
  const btn = `
    <button id="${id}" class="${clas} btn" type="submit">${text}</button>
    `
  return btn
}

export default BtnType
