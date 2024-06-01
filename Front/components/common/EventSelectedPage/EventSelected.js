import './EventSelected.css'

const ShowEventSelected = (eventSelected) => {
  const selectedEvent = `
  <section id="EventSelectedPage">
    <button id="closePage" background-img="./redcross.png"></button>
    <div id="EventSelectedBasicInfo">
      <img id="EventSelectedimg" src="${eventSelected.img}"/>
      <h2 id="EventSelectedTitle">${eventSelected.titutlo}</h2>
      <p id="EventSelectedFecha">${eventSelected.fecha}</p>
      <p id="EventSelectedLocation">${eventSelected.Ubicacion}</p>
    </div>
    <div id="EventSelectedMoreInfo">
      <p id="EventselectedLongDescrp">...Pendding....</p>
      <button id="EventSelectedBtnJoin">Apuntate!</button>
      <button id="EventSelectedBtnShowAsistance">Participantes</button>
    </div>
  </section>
  `
  return selectedEvent
}
export default ShowEventSelected
