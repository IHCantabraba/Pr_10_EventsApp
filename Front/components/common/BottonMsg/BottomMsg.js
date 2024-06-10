import './BottomMsg.css'
const MsgTemplate = (msg, icon, clas) => {
  const DialogDiv = document.createElement('div')
  DialogDiv.id = 'Dialog-Div'
  DialogDiv.classList.add(clas)
  const dialogHeader = document.createElement('div')
  dialogHeader.id = 'Dialog-header'
  dialogHeader.classList.add(clas)
  const DialogInfoDiv = document.createElement('div')
  DialogInfoDiv.id = 'Dialig-info-Div'
  const msgSymbol = document.createElement('img')
  msgSymbol.id = 'msg-symbol'
  msgSymbol.src = icon
  const MsgP = document.createElement('p')
  MsgP.id = 'Msg'
  MsgP.textContent = msg

  DialogDiv.append(dialogHeader)
  DialogInfoDiv.append(msgSymbol)
  DialogInfoDiv.append(MsgP)
  DialogDiv.append(DialogInfoDiv)

  return DialogDiv
}

export default MsgTemplate
