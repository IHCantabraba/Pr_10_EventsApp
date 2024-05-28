import './Loing.css'
import Btn from '../../components/common/Button/button'
import InputElem from '../../components/common/Input/Input'
import Events from '../Events/Events'

const template = () => `
  <section id="login-form">

  ${
    localStorage.getItem('user')
      ? `<h2> You are already logged</h2>`
      : `
    <form id="login-page">
      <div id="loinginfo">
      <p id="LoginName">user name</p>
      <p id="LoginPassword">Password</p>
      </div>
      <div id="logindiv">
        ${InputElem('text', 'username', 'LoginUser')}
        ${InputElem('password', 'Password', 'password')}
      </div>
      ${Btn('LoginBtn', 'Login', 'submitLogin')}

    </form>`
  }
  </section>
`

const Login = () => {
  document.querySelector('main').innerHTML = template()
  if (document.querySelector('#LoginBtn')) {
    document.querySelector('#LoginBtn').addEventListener('click', (e) => {
      e.preventDefault()
      loginsubmit()
    })
  }
}
const loginsubmit = async () => {
  const username = document.querySelector('#LoginUser').value
  const password = document.querySelector('#password').value
  const data = await fetch('http://localhost:3000/api/v1/users/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ nombre: username, password: password })
  })
  const dataResponse = await data.json()
  console.log(`Login server answer is: ${dataResponse.user.img}`)
  const userIcon = document.querySelector('.userIcon')
  if (dataResponse.user.img === 'undefined') {
    userIcon.src = 'no-image.png'
  } else {
    userIcon.src = dataResponse.user.img
  }

  console.log(`Login server answer is: ${dataResponse.user.nombre}`)
  const loggedName = document.querySelector('.userName')
  loggedName.innerHTML = dataResponse.user.nombre

  // localStorage.setItem('user', JSON.stringify(dataResponse))

  alert(`welcome ${username}`)
  Events()
}
export default Login
