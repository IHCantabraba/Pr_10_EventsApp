import notification from './notification'
const registerErrorParser = (errorMsg) => {
  const neededinfo = ['nombre', 'email', 'password']
  if (errorMsg.includes('ValidationError')) {
    neededinfo.forEach((data) => {
      if (errorMsg.includes(data)) {
        notification(`${data} field is required!`, './redcross.png', 'bad')
      }
    })
  }
  if (errorMsg.includes('User already exists')) {
    notification(
      'User Name already exists. Choose another!',
      './redcross.png',
      'bad'
    )
  } else {
    notification('Server Error!', './redcross.png', 'bad')
  }
  const RegisterBtn = document.querySelector('#sumitRegister')
  RegisterBtn.textContent = 'Enviar'
  RegisterBtn.style.backgroundColor = 'black'
}

export default registerErrorParser
