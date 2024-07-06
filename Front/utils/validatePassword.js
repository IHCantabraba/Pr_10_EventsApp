import notification from './notification'

const validatePassword = (password, Repeatedpassword) => {
  let Msg
  let icon = './redcross.png'
  let estado = 'bad'

  if (password === '' && Repeatedpassword === '') {
    Msg = 'Password and Repeat password are required!'
  }
  if (password !== '' && Repeatedpassword === '') {
    Msg = 'Repeat Password is required!'
  }
  if (password === '' && Repeatedpassword !== '') {
    Msg = ' Password is required!'
  }
  if (
    password !== Repeatedpassword &&
    password !== '' &&
    Repeatedpassword !== ''
  ) {
    Msg = ' Password and Repeated Password mismatch!!'
  }
  notification(Msg, icon, estado)
  const RegisterBtn = document.querySelector('#sumitRegister')
  RegisterBtn.textContent = 'Enviar'
  RegisterBtn.style.backgroundColor = 'black'
}

export default validatePassword
