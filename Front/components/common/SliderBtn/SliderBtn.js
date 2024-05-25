import './SliderBtn.css'

const sliderBtn = () => {
  /* create tags */
  const BtnTemplate = `
  <div id="slider-btn">
    <label class="toggle">
      <input type="checkbox" id='check' onChange="${Themes()}">
      <span class="slider">
    </label>
    </span>
    <p>Dark</p>
  </div>
  `
  function Themes() {
    if (this) {
      console.log('checked!')
    } else {
      console.log('unckecked')
    }
  }
  return BtnTemplate
}

export default sliderBtn
