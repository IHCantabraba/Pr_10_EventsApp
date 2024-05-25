import './Landing.css'
import Btn from '../common/Button/button'
const LandingTemplate = () => {
  const app = document.querySelector('main')
  const template = `
    <div id="landing">
    <div id="publicity">
      <h2 id="public-info">
        Registrate, publica y haz que tus eventos sean un éxito!
      </h2>
      <h2 id="public-info-process">
        Estas a dos clicks de llevar a todo el mundo tus eventos!!
      </h2>
    </div>
      <div id="landing-msg">
        <h2 id="landing-Title">
        Publicita tus Eventos aqui!
        </h2>
        <div id="landing-options">
          ${Btn('landing-login-btn', 'Login', 'loginBtn')}
          ${Btn('landing-register-btn', 'Register', 'registerBtn')}
        </div>    
      </div>
    </div>
  `
  app.innerHTML = template
}

export default LandingTemplate
