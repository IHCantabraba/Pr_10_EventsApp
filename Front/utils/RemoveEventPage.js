import Events from '../pages/Events/Events'

const RemoveEventPage = () => {
  console.log('removing')
  const page = document.querySelector('.EventSelectedPage')
  page.remove()
  Events()
}
export default RemoveEventPage
