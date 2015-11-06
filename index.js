import React from 'react'
import ReactDOM from 'react-dom'

export default class CircularGauge extends React.Component {

  static propTypes = {
    size: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    arcBackgroundColor: React.PropTypes.string,
    arcColor: React.PropTypes.string
  }

  static defaultProps = {
    className: 'react-canvas-circular-gauge',
    arcBackgroundColor: '#6D6D72',
    arcColor: '#049'
  }

  constructor (props) {
    super(props)
    this.radius = 0
  }

  componentDidMount =  () => {
    const { size } = this.props
    const context = this.getCanvasContext()

    this.radius = size / 2
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = `bold ${this.radius / 2.5}px Arial`
    this.drawBackground()
    this.drawProgress()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { size } = this.props
    this.radius = size / 2
    this.clearProgress()
    this.drawProgress()
  }

  getCanvasContext = () => {
    const node = ReactDOM.findDOMNode(this.refs.canvas)
    return node.getContext('2d')
  }

  drawBackground = () => {
    const {
      radius,
      props
    } = this
    const context = this.getCanvasContext()
    context.fillStyle = props.arcColor
    context.beginPath()
    context.arc(radius, radius, radius, 0, Math.PI * 2, false)
    context.arc(radius, radius, radius / 1.5, Math.PI * 2, 0, true)
    context.fill()
  }

  drawProgress =  () => {
    const {
      radius,
      props } = this
    const {
      percent,
      arcBackgroundColor } = props
    const context = this.getCanvasContext()
    context.fillText(`${percent}%`, radius, radius)
    context.fillStyle = arcBackgroundColor
    context.beginPath()
    context.arc(radius, radius, radius, Math.PI * 2 * percent * 1.01, Math.PI * 2, false)
    context.arc(radius, radius, radius / 1.5, Math.PI * 2, Math.PI * 2 * percent * 0.01, true)
    context.fill()
  }

  clearProgress = () => {
    const { size } = this.props
    const context = this.getCanvasContext()
    context.clearRect(0, 0, size, size)
    this.drawBackground()
  }

  render () {
    const { size, className } = this.props
    return (
      <canvas
        className={className}
        ref='canvas'
        width={size}
        height={size}
      />
    )
  }
}
