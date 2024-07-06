import notification from './notification'
const registerErrorParser = (errorMsg) => {
  const neededinfo = ['nombre', 'email', 'password']
  if (errorMsg.includes('ValidationError')) {
    neededinfo.forEach((data) => {
      if (errorMsg.includes(data)) {
        notification(`${data} field is required!`, './redcross.png', 'bad')
      }
    })
  } else {
    notification('Server Error!', './redcross.png', 'bad')
  }
}

export default registerErrorParser
