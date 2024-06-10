import Events from '../pages/Events/Events'

const RemoveEventPage = () => {
  console.log('removing')
  const page = document.querySelector('.EventSelectedPage')
  // page.classList.toggle('show')
  // page.classList.toggle('hide')
  page.remove()
  Events()
}
export default RemoveEventPage
