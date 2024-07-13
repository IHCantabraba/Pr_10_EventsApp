const changeSubmitBtnAppearence = (selector, text, color) => {
  const loginBtn = document.querySelector(selector)
  loginBtn.textContent = text
  loginBtn.style.backgroundColor = color
}
export default changeSubmitBtnAppearence
