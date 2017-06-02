import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const defaultItems = [
  { id: 'a', frequency: '92.5', callsign: 'CKIS' },
  { id: 'b', frequency: '93.5', callsign: 'CFXJ' },
  { id: 'c', frequency: '94.1', callsign: 'CBL' },
  { id: 'd', frequency: '96.9', callsign: 'CKHC' },
  { id: 'e', frequency: '99.9', callsign: 'CBLA' },
  { id: 'f', frequency: '103.5', callsign: 'CIDC' },
  { id: 'g', frequency: '103.9', callsign: 'CIRR' },
];

const getCarouselItemPositionData = ({
  position,
  width,
  height,
  parentWidth,
  parentHeight,
}) => {
  let rawData;
  switch (position) {
    case 0:
      rawData = { scale: 0.25, x: 0.25, y: 0.5, opacity: 0.25, zIndex: 1 };
      break;
    case 1:
      rawData = { scale: 0.5, x: 0.2, y: 0.5, opacity: 0.5, zIndex: 2 };
      break;
    case 2:
      rawData = { scale: 0.75, x: 0.35, y: 0.5, opacity: 0.75, zIndex: 3 };
      break;
    case 3:
      rawData = { scale: 1, x: 0.5, y: 0.5, opacity: 1, zIndex: 4 };
      break;
    case 4:
      rawData = { scale: 0.75, x: 0.65, y: 0.5, opacity: 0.75, zIndex: 3 };
      break;
    case 5:
      rawData = { scale: 0.5, x: 0.8, y: 0.5, opacity: 0.5, zIndex: 2 };
      break;
    case 6:
      rawData = { scale: 0.25, x: 0.75, y: 0.5, opacity: 0.25, zIndex: 1 };
      break;
  }

  return Object.assign({}, rawData, {
    // We've worked out x/y coordinates, but they're set as ratios of the
    // parent container (eg. an `x` of 0.25 in a container that's 1000px wide
    // should translate to 250px).
    //
    // We also need to subtract half of the item's width, since transforms work
    // not from the center point but from the left edge.
    x: rawData.x * parentWidth - (width / 2),
    y: rawData.y * parentHeight - (height / 2),
  });
}

class CarouselItem extends Component {
  componentDidUpdate(prevProps) {
    const { positionData: oldPositionData } = prevProps;
    const { positionData } = this.props;

    console.log(positionData.x, oldPositionData.x)

    if (positionData.x === oldPositionData.x) {
      return;
    }

    console.log({
      opacity: oldPositionData.opacity,
      transform: `translate(${oldPositionData.x}px, ${oldPositionData.y}px) scale(${oldPositionData.scale})`,
    })

    // Apply the previous position's transforms immediately.
    // Then, add a CSS transition.
    this.elem.style.opacity = oldPositionData.opacity;
    this.elem.style.transform = `translate(${oldPositionData.x}px, ${oldPositionData.y}px) scale(${oldPositionData.scale})`;
    this.elem.style.zIndex = oldPositionData.zIndex;

    window.requestAnimationFrame(() => {
      this.elem.style.opacity = positionData.opacity;
      this.elem.style.transform = `translate(${positionData.x}px, ${positionData.y}px) scale(${positionData.scale})`;
      this.elem.style.zIndex = positionData.zIndex;
    })
  }

  render() {
    const {
      positionData: {
        opacity,
        scale,
        x,
        y,
      },
      frequency,
      callsign,
      carouselWidth,
      carouselHeight,
      width,
      height,
    } = this.props;

    const style = {
      width,
      height,
      opacity,
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
    };

    return (
      <div
        className="CarouselItem"
        style={style}
        ref={elem => { this.elem = elem; }}
      >
        <h2>{callsign}</h2>
        <h4>{frequency}</h4>
      </div>
    )
  }
}

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.rotateForward = this.rotateForward.bind(this);
    this.rotateBackward = this.rotateBackward.bind(this);

    this.state = {
      items: props.initialItems,
    };
  }

  rotateForward() {
    const { items } = this.state;
    const lastItem = items[items.length - 1];

    this.setState({
      items: [lastItem, ...items.slice(0, items.length - 1)],
    });
  }

  rotateBackward() {
    const { items } = this.state;

    this.setState({
      items: [...items.slice(1), items[0]],
    });
  }

  render() {
    const {
      items,
      carouselWidth,
      carouselHeight,
      itemWidth,
      itemHeight,
    } = this.props;

    const carouselStyle = { width: carouselWidth, height: carouselHeight };

    return (
      <div>
        <div className="Carousel" style={carouselStyle}>
          {this.state.items.map((item, position) => (
            <CarouselItem
              key={item.id}
              positionData={getCarouselItemPositionData({
                position,
                width: itemWidth,
                height: itemHeight,
                parentWidth: carouselWidth,
                parentHeight: carouselHeight,
              })}
              width={itemWidth}
              height={itemHeight}
              carouselWidth={carouselWidth}
              carouselHeight={carouselHeight}
              {...item}
            />
          ))}
        </div>
        <div className="controls">
          <button onClick={this.rotateBackward}>Previous</button>
          <button onClick={this.rotateForward}>Next</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Carousel
          initialItems={defaultItems}
          carouselWidth={800}
          carouselHeight={600}
          itemWidth={150}
          itemHeight={100}
        />
      </div>
    );
  }
}

export default App;
