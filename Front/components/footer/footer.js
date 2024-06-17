import './footer.css'

const footer = () => {
  const footerInfo = `
  <footer id="footer">
    <!-- &#169 copyright symbol-->
    <p>&#169 By Iñigo Hidalgo</p> 
    <img class="footer-img" src="https://res.cloudinary.com/df7b0dj9r/image/upload/v1716582137/footer/icons8-instagram-50_bkgdnd.png"/>
    <img class="footer-img" src="https://res.cloudinary.com/df7b0dj9r/image/upload/v1716582099/footer/icons8-linkedin-50_1_loodwv.png"/>
    <img class="footer-img" src="https://res.cloudinary.com/df7b0dj9r/image/upload/v1716582291/footer/icons8-twitterx-50_p5ltcm.png"/>
    <img class="footer-img" src="https://res.cloudinary.com/df7b0dj9r/image/upload/c_scale,w_50/v1716582099/footer/icons8-github-30_n2mfcq.png" />
    
  </footer>
  `
  document.querySelector('#app').innerHTML += footerInfo
}
export default footer
