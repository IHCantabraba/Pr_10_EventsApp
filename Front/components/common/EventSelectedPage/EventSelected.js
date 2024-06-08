// import { events } from '../../../../Back/src/api/models/attendances'
import './EventSelected.css'

const ShowEventSelected = (eventSelected) => {
  let longDescription = eventSelected.longDescription
  if (longDescription === '') {
    console.log('empty')
    longDescription =
      '...Information Not available right now. Sorry for disturbances...'
  }
  const selectedEvent = `
  <section class="EventSelectedPage show">
    <button class="closePage" background-img="./redcross.png"></button>
    <div class="EventSelectedBasicInfo">
      <img class="EventSelectedimg" src="${eventSelected.img}"/>
      <h2 class="EventSelectedTitle">${eventSelected.titulo}</h2>
      <p class="EventSelectedFecha">${eventSelected.fecha}</p>
      <p class="EventSelectedLocation">${eventSelected.ubicacion}</p>
    </div>
    <div class="EventSelectedMoreInfo">
      <p class="EventselectedLongDescrp">${longDescription}</p>
      <div class="EventSelectedPageOptions">
        <button class="EventSelectedBtnJoin btn ${eventSelected._id}">Apuntate!</button>
        <button class="EventSelectedBtnShowAsistance btn">Participantes</button>
      </div>
    </div>
  </section>
  `
  return selectedEvent
}
export default ShowEventSelected
