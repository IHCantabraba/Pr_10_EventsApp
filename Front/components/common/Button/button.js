import './button.css'
const Btn = (id, text, clas) => {
  const btn = `
    <button id="${id}" class="${clas} btn">${text}</button>
    `
  return btn
}

export default Btn
