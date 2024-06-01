import './BottomMsg.css'
const MsgTemplate = (msg, icon, clas) =>
  `
  <div id="Dialog-Div" class="${clas}">
    <div id="Dialog-header" class="${clas}"></div>
    <div id="Dialig-info-Div">
    <img id="msg-symbol" src="${icon}">
    <p id="Msg">${msg}</p>
    </div>
    
  </div>
`
export default MsgTemplate
