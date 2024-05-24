import './header.css'
const HeaderTemplate = () => {
  const template = `
    <div id="app">
      <header id="header">
        <h1 id="app-Title">Events App</h1>
        <div id="app-Pages">
          <a href="#" id="registerLink">Register</a>
          <a href="#" id="loginLink">Login</a>
          <a href="#" id="Events">Eventos</a>
        </div>
        <div id="userLogged">
          <img class="userIcon"></img>
          <p clas="userName">No user logged</p></div>
      </header>
    </div>
  `
  document.body.innerHTML = template
}

export default HeaderTemplate
