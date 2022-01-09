import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: "hex" };
    this.changeFormat = this.changeFormat.bind(this);
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allCollors = palette.colors;
    for (let key in allCollors) {
      shades = shades.concat(allCollors[key].filter(color => color.id === colorToFilterBy))
    }
    // return all shades of given color
    return shades.slice(1);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  render() {
    const { format } = this.state;
    const { paletteName } = this.props.palette;
    const colorBoxes = this._shades.map(color =>
      <ColorBox
        key={color.id}
        name={color.name}
        background={color[format]}
        showLink={false} />
    )
    return (
      <div className='Palette'>
        <Navbar
          handleChange={this.changeFormat}
          showingAllColors={false}
        />
        <div className='Palette-colors'>
          {colorBoxes}
        </div>
        <PaletteFooter paletteName={paletteName} />
      </div>
    )
  }
}

export default SingleColorPalette;