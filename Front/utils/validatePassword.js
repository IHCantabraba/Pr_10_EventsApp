import notification from './notification'

const validatePassword = (password, Repeatedpassword) => {
  if (password === '' && Repeatedpassword === '') {
    console.log(password, Repeatedpassword)
    notification(
      'Password and Repeat password are required!',
      './redcross.png',
      'bad'
    )
  }
  if (password !== '' && Repeatedpassword === '') {
    console.log(password, Repeatedpassword)
    notification('Repeat Password is required!', './redcross.png', 'bad')
  }
  if (password === '' && Repeatedpassword !== '') {
    console.log(password, Repeatedpassword)
    notification(' Password is required!', './redcross.png', 'bad')
  }
  if (
    password !== Repeatedpassword &&
    password !== '' &&
    Repeatedpassword !== ''
  ) {
    console.log(password, Repeatedpassword)
    notification(
      ' Password and Repeated Password mismatch!!',
      './redcross.png',
      'bad'
    )
  }
}

export default validatePassword
