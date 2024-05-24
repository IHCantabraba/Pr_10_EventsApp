import './Landing.css'
const LandingTemplate = () => {
  const app = document.getElementById('app')
  const template = `
  <div id="landing">
    <div id="landing-msg">
      <h2 id="landing-Title">
      Publicita tus Eventos aqui!
      </h2>
      <div id="landing-options">
        <button id="landing-login-btn">Login</button>
        <button id="landing-register-btn">Register</button>    
      </div>    
    </div>
  </div>
  `
  app.innerHTML += template
}

export default LandingTemplate
