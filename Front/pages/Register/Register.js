import './Register.css'
import InputElem from '../../components/common/Input/Input'
import Btn from '../../components/common/Button/button'
import DragDrop from '../../components/common/DragDrop/DragDrop'

const template = () => `
  <section id="register-form">
    <form id="register-page">
      ${InputElem('text', 'Username', 'username')}
      ${InputElem('text', 'email', 'email')}
      ${InputElem('password', 'Password', 'password')}
      ${InputElem('password', 'Repeat Password', 'password')}
      ${DragDrop()}
      </div>
      ${Btn('registrationBtn', 'register', 'submitRegistration')}
    </form>
  </section>
`
const Register = () => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#registrationBtn').addEventListener('click', () => {
    console.log('registering')
  })

  const dragdrop = document.querySelector('#drop_zone')

  dragdrop.ondragover = function (e) {
    e.preventDefaul()
  }
  dragdrop.ondrop = function (e) {
    this.appendChild(dragdrop)
  }
}
export default Register
