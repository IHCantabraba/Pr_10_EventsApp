import './header.css'
import sliderBtn from '../common/SliderBtn/SliderBtn'

const HeaderTemplate = () => {
  const template = `
    <div id="app">
      <header id="header">
        <h1 id="app-Title">Find your Event!</h1>
        <div id="app-Pages">
          <a href="#" id="NewEvent">Crear Evento</a>
          <a href="#" id="loginLink">Login</a>
          <a href="#" id="registerLink">Register</a>
          <a href="#" id="logoutLink">Long Out</a>
        </div>
        <div id="userLogged">
          <img class="userIcon" src="no-image.png"></img>
          <p class="userName">No user</p></div>
      </header>
    </div>
  `
  document.body.innerHTML = template
}

export default HeaderTemplate
