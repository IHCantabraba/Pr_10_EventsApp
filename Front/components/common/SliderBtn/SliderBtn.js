import './SliderBtn.css'

const sliderBtn = () => {
  /* create tags */
  const BtnTemplate = `
  <div id="slider-btn">
    <label class="toggle">
      <input type="checkbox" id='checkboxInput'>
      <span class="slider">
    </label>
    </span>
    <p>Dark</p>
  </div>
  `
  return BtnTemplate
}
export default sliderBtn
