import './Events.css'

const template = () =>
  `
  <h1>We arrive to Events!!!</h1>
`
const Events = () => {
  document.querySelector('main').innerHTML = template()
}

export default Events
