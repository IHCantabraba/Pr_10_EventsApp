const selectedEvent = (eventSelected, longDesription) => {
  const section = document.createElement('section')
  section.classList.add('EventSelectedPage')
  section.classList.add('show')

  const btnClose = document.createElement('btn')
  btnClose.classList.add('closePage')
  btnClose.style.backgroundImage = 'url("./redcross.png")'
  section.append(btnClose)

  const divBasic = document.createElement('div')
  divBasic.classList.add('EventSelectedBasicInfo')
  section.append(divBasic)
  const h2Event = document.createElement('h2')
  h2Event.classList.add('EventSelectedTitle')
  h2Event.textContent = eventSelected.titulo
  divBasic.append(h2Event)
  const imgEvent = document.createElement('img')
  imgEvent.classList.add('EventSelectedimg')
  imgEvent.src = eventSelected.img
  divBasic.append(imgEvent)

  const divTImePlace = document.createElement('div')
  divTImePlace.classList.add('dateplace')
  const pFecha = document.createElement('p')
  pFecha.classList.add('EventSelectedFecha')
  pFecha.textContent = eventSelected.fecha
  divTImePlace.append(pFecha)

  const pLocation = document.createElement('p')
  pLocation.classList.add('EventSelectedLocation')
  pLocation.textContent = eventSelected.ubicacion
  divTImePlace.append(pLocation)
  divBasic.append(divTImePlace)
  const divMore = document.createElement('div')
  divMore.classList.add('EventSelectedMoreInfo')

  const pDesc = document.createElement('p')
  pDesc.classList.add('EventselectedLongDescrp')
  pDesc.textContent = longDesription
  divMore.append(pDesc)

  const divoption = document.createElement('div')
  divoption.classList.add('EventSelectedPageOptions')

  const btnJoin = document.createElement('button')
  btnJoin.classList.add('EventSelectedBtnJoin')
  btnJoin.classList.add('btn')
  btnJoin.classList.add(eventSelected._id)
  btnJoin.textContent = 'Apuntate!'
  divoption.append(btnJoin)

  const btnAsis = document.createElement('button')
  btnAsis.classList.add('EventSelectedBtnShowAsistance')
  btnAsis.classList.add('btn')
  btnAsis.textContent = 'Ver Participantes'
  divoption.append(btnAsis)
  divMore.append(divoption)
  section.append(divMore)

  document.querySelector('main').appendChild(section)
}

export default selectedEvent
