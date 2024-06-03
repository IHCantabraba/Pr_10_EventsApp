import './header.css'
import sliderBtn from '../common/SliderBtn/SliderBtn'
const HeaderTemplate = () => {
  const template = `
    <div id="app">
      <header id="header">
        <h1 id="app-Title">Find your Event!</h1>
        <div id="app-Pages">
          <a href="#" id="Events">Eventos</a>
          <a href="#" id="loginLink">Login</a>
          <a href="#" id="registerLink">Register</a>
          <a href="#" id="logoutLink">Long Out</a>
        </div>
        ${sliderBtn()}
        <div id="userLogged">
          <img class="userIcon"></img>
          <p class="userName">No user logged</p></div>
      </header>
    </div>
  `
  document.body.innerHTML = template
  /* TODO --> not working */
  // let Changetheme = document.querySelector('#check')
  // Changetheme.addEventListener('change', function () {
  //   console.log('changing')
  //   /* para usar "this." se requiere usar function () {} */
  //   /* si se usa ()=>{} se debe usar e.target */
  //   if (this.checked) {
  //     p.innerHTML = 'What ever you want to activate'
  //   } else {
  //     p.innerHTML = 'What ever you want to deactivate'
  //   }
  // })
}

export default HeaderTemplate
