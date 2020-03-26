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
  alertMessage: string;

  constructor(props: any) {
    super(props);
    this.state = { textBoxValue: "" };
    this.alertMessage = "";
  }

  getChildValue = (value: any) => {
    this.setState({
      textBoxValue: value
    });
  };

  submitBtnClick = () => {
    const { cbFromParent } = this.props;

    const { textBoxValue } = this.state;
    if (!textBoxValue) return;

    if (cbFromParent) cbFromParent([]);

    fetch(`https://whispering-sea-82070.herokuapp.com?url=${textBoxValue}`)
      .then(response => response.text())
      .then(txt => {
        console.log(txt);
        const obj = JSON.parse(txt);
        if (obj && cbFromParent) {
          this.alertMessage = "";
          const places = obj.places ? obj.places : [];
          cbFromParent(places);
        }
      })
      .catch(err => {
        console.log(err);
        this.alertMessage =
          "Error handling request. Try once again or try another page.";
      });
    //   .then(async (res: Response) => {
    //   if (res && res.body && cbFromParent) {
    //     this.alertMessage = '';
    //     const objResponse = await res.json();
    //     const places = objResponse.places ? objResponse.places : [];
    //     cbFromParent(places);
    //   }
    // })
    //   .catch((err) => {
    //     console.log(err);
    //     this.alertMessage = 'Error handling request. Try once again or try another page.';
    //   });
  };

  clearBtnClick = () => {
    const { cbFromParent } = this.props;
    if (cbFromParent) cbFromParent([]);
  };

  render() {
    return (
      <div className="controlPanel">
        <Textbox cbFromParent={this.getChildValue} />
        <div className="controlPanel__buttons">
          <button
            type="button"
            onClick={this.submitBtnClick}
            className="controlPanel__tb waves-effect waves-light btn"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={this.clearBtnClick}
            className="controlPanel__tb waves-effect waves-light btn red"
          >
            Clear all
          </button>
        </div>
        <div>
          <p>{this.alertMessage}</p>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
