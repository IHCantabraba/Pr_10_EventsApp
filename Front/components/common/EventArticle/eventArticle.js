import './EventArticle.css'
const createArticle = (event) => {
  const pretitle = event.titulo
  const titulo = pretitle.replaceAll(' ', '')
  const plazas = event.limitParticipantes
  const asistentes = event.users.length
  let plazasRestantes = 0
  if (plazas !== 9999) {
    plazasRestantes = plazas - asistentes + ' plazas'
    if (plazasRestantes === 0) {
      plazasRestantes = 'Agotado'
    }
  } else {
    plazasRestantes = 'No limit'
  }
  const article = `
    <article class="event-article">
      <p id="${event._id}" class="hidenP">eventId-info</p>
      <button id="${event._id}" class="openEvent"></button>
      <img class="event-img" class="img" src="${event.img}" >
      <h2 class="event-title" clas="title">${event.titulo}</h2>
      <div class="event-info">
        <h3 class="event-desc">${event.descripcion}</h3>
        <p class="event-date">${event.fecha}</p>
        <p class="event-location">${event.ubicacion}</p>
      </div>
      <div id="reserved" class="reservation ${titulo}">${event.reserva}</div>
      <p class="freePlaces">${plazasRestantes}</p>
    </article>
  `
  return article
}
export default createArticle
