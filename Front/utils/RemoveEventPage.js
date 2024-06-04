const RemoveEventPage = () => {
  const page = document.querySelector('.EventSelectedPage')
  page.classList.toggle('show')
  page.classList.toggle('hide')
  document.querySelector('#events-section').classList.toggle('blur')
}
export default RemoveEventPage
