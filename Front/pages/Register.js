import Btn from '../components/common/Button/button'

const template = () => `
  <section id="register-form">
    <form>
      <input type="text" placeholder="Username" id="username"/>
      <input type="password" placeholder="Password" id="password"/>
      ${Btn('registrationBtn', 'register', 'submitRegistration')}
    </form>
  </section>
`
const Register = () => {
  document.querySelector('main').innerHTML = template()
  document.querySelector('#registrationBtn').addEventListener('click', () => {
    console.log('registering')
  })
}
export default Register
