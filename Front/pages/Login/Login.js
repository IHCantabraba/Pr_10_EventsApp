import './Loing.css'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'

const template = () => `
  <section id="login-form">
    <form id="login-page">
      <div id="loinginfo">
      <p id="LoginName">user name</p>
      <p id="LoginPassword">Password</p>
      </div>
      <div id="logindiv">
        ${InputElem('text', 'username', 'LoginUser')}
        ${InputElem('password', 'Password', 'password')}
      </div>
      ${Btn('LoginBtn', 'Login', 'submitRegistration')}

    </form>
  </section>
`

const Login = () => {
  document.querySelector('main').innerHTML = template()
}

export default Login
