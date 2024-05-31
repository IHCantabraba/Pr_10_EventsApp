const RemoveMsgDiv = () => {
  setTimeout(() => {
    const info = document.querySelector('#Dialog-Div')
    info.remove()
  }, 2000)
}

export default RemoveMsgDiv
