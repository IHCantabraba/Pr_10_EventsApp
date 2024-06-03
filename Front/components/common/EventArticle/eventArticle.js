import './EventArticle.css'
const createArticle = (event) => {
  const pretitle = event.titulo
  const titulo = pretitle.replaceAll(' ', '')
  const article = `
    <article class="event-article">
      <p id="eventId-info">${event._id}</p>
      <button id="openEvent" class="${event._id}"></button>
      <img id="event-img" class="img" src="${event.img}" >
      <h2 id="event-title" clas="title">${event.titulo}</h2>
      <div id="event-info">
        <h3 id="event-desc">${event.descripcion}</h3>
        <p id="event-date">${event.fecha}</p>
        <p id="event-location">${event.ubicacion}</p>
      </div>
      <div id="reserved" class="reservation ${titulo}">${event.reserva}</div>
    </article>
  `
  return article
}
export default createArticle
