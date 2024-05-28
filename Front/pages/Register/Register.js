import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import BtnType from '../../components/common/Button/buttonType'
import Login from '../Login/Login'
// onsubmit="${submitRegister}" enctype="multipart/form-data"
/* Register template */
const template = () => `
  <section id="register-form">
    <form id="register-page" >
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'passwordRepeted')}
      ${InputElem('file', '', 'avatar', 'avatar')}
      </div>
      <div id="registerBtns">
        ${Btn('sumitRegister', 'Enviar', 'sumitRegister')}
        ${Btn('cancelBtn', 'Cancel', 'cancel')}
      </div>
    </form>
  </section>
`
/* Register page */
const Register = () => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#sumitRegister').addEventListener('click', () => {
    submitRegister()
    Login()
  })
}

const submitRegister = async () => {
  console.log('ready to get data to register')
  try {
    const form = document.querySelector('#register-page')
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    const email = document.querySelector('#email').value
    const avatar = document.querySelector('.avatar').files[0]

    const data = new FormData(form)
    data.append('nombre', username)
    data.append('email', email)
    data.append('password', password)
    data.append('img', avatar)
    console.log(data.entries())
    await fetch('http://localhost:3000/api/v1/users/register', {
      method: 'POST',
      body: data,
      mode: 'cors',
      cache: 'default'
    })
    alert(`Please, log in with your credentials`)
  } catch (error) {
    console.log(error)
  }
}
export default Register
