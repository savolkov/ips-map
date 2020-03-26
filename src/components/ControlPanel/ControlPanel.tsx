import React from 'react';
import './ControlPanel.css';
import Textbox from '../Textbox/Textbox';

type controlPanelState = {
  textBoxValue: string;
}

type controlPanelProps = {
  cbFromParent: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class ControlPanel extends React.Component<controlPanelProps, controlPanelState> {
  constructor(props: any) {
    super(props);
    this.state = { textBoxValue: '' };
  }

  getChildValue = (value: any) => {
    this.setState({
      textBoxValue: value,
    });
  };

  submitBtnClick = () => {
    // const textBoxValue = [
    //   { coords: { lat: 59.0058887, lng: 56.2708801 }, text: 'Text1' },
    //   { coords: { lat: 58.0058887, lng: 56.2708801 }, text: 'Text2' },
    //   { coords: { lat: 57.0058887, lng: 56.2708801 }, text: 'Text3' },
    //   { coords: { lat: 56.0058887, lng: 56.2708801 }, text: 'Text4' },
    // ];
    const { cbFromParent } = this.props;

    const { textBoxValue } = this.state;
    console.log(textBoxValue);
    fetch('https://whispering-sea-82070.herokuapp.com/')
      .then(async (res: Response) => {
        if (res && res.body && cbFromParent) {
          const objResponse = await res.json();
          const places = objResponse.places ? objResponse.places : [];
          cbFromParent(places);
        }
      });
  };

  clearBtnClick = () => {
    this.setState({ textBoxValue: '' });
    const { cbFromParent } = this.props;
    if (cbFromParent) cbFromParent([]);
  };

  render() {
    return (
      <div className="controlPanel">
        <Textbox
          cbFromParent={this.getChildValue}
        />
        <button type="button" onClick={this.submitBtnClick} className="controlPanel__tb">
          Submit
        </button>
        <button type="button" onClick={this.clearBtnClick} className="controlPanel__tb">
          Clear all
        </button>
      </div>
    );
  }
}

export default ControlPanel;
