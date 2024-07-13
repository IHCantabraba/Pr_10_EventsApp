import Events from '../../pages/Events/Events'

const RemoveEventPage = (clas) => {
  console.log('removing')
  const page = document.querySelector(`.${clas}`)
  page.remove()
  // Events()
}
export default RemoveEventPage
