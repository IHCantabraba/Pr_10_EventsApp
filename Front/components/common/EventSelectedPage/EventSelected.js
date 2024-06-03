import './EventSelected.css'

const ShowEventSelected = (eventSelected) => {
  console.log(`arrived obj is: ${eventSelected}`)

  const selectedEvent = `
  <section id="EventSelectedPage" class="show">
    <button id="closePage" background-img="./redcross.png"></button>
    <div id="EventSelectedBasicInfo">
      <img id="EventSelectedimg" src="${eventSelected.img}"/>
      <h2 id="EventSelectedTitle">${eventSelected.titulo}</h2>
      <p id="EventSelectedFecha">${eventSelected.fecha}</p>
      <p id="EventSelectedLocation">${eventSelected.ubicacion}</p>
    </div>
    <div id="EventSelectedMoreInfo">
      <p id="EventselectedLongDescrp">${eventSelected.longDescription}</p>
      <div id="EventSelectedPageOptions">
        <button id="EventSelectedBtnJoin" class="btn">Apuntate!</button>
        <button id="EventSelectedBtnShowAsistance" class="btn">Participantes</button>
      </div>
    </div>
  </section>
  `
  return selectedEvent
}
export default ShowEventSelected
