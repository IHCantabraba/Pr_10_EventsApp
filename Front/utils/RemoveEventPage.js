import Events from '../pages/Events/Events'

const RemoveEventPage = () => {
  console.log('removing')
  const page = document.querySelector('.EventSelectedPage')
  // page.classList.toggle('show')
  // page.classList.toggle('hide')
  page.remove()
  document.querySelector('#events-section').classList.toggle('blur')
  Events()
}
export default RemoveEventPage
