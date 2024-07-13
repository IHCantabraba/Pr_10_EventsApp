import MsgTemplate from '../../components/common/BottonMsg/BottomMsg'
import RemoveMsgDiv from './RemoveMsgDiv'

const notification = (msg, icon, tipo) => {
  document.querySelector('main').append(MsgTemplate(msg, icon, tipo))

  document.querySelector('#Dialog-Div') ? RemoveMsgDiv() : 0
}
export default notification
