import React from "react";
import "./ControlPanel.css";
import Textbox from "../Textbox/Textbox";

type controlPanelState = {
  textBoxValue: string;
};

type controlPanelProps = {
  cbFromParent: any;
};

// eslint-disable-next-line react/prefer-stateless-function
class ControlPanel extends React.Component<
  controlPanelProps,
  controlPanelState
> {
  constructor(props: any) {
    super(props);
    this.state = { textBoxValue: "" };
  }

  getChildValue = (value: any) => {
    this.setState({
      textBoxValue: value
    });
  };

  submitBtnClick = () => {
    const { cbFromParent } = this.props;

    const { textBoxValue } = this.state;

    fetch(
      `https://whispering-sea-82070.herokuapp.com?url=${textBoxValue}`
    ).then(async (res: Response) => {
      if (res && res.body && cbFromParent) {
        const objResponse = await res.json();
        const places = objResponse.places ? objResponse.places : [];
        cbFromParent(places);
      }
    });
  };

  clearBtnClick = () => {
    this.setState({ textBoxValue: "" });
    const { cbFromParent } = this.props;
    if (cbFromParent) cbFromParent([]);
  };

  render() {
    return (
      <div className="controlPanel">
        <Textbox cbFromParent={this.getChildValue} />
        <button
          type="button"
          onClick={this.submitBtnClick}
          className="controlPanel__tb"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={this.clearBtnClick}
          className="controlPanel__tb"
        >
          Clear all
        </button>
      </div>
    );
  }
}

export default ControlPanel;
