import React from 'react';
import './Textbox.css';

type TextBoxState = {
  value: string;
}

type TextboxProps = {
  cbFromParent: any;
}

// eslint-disable-next-line react/prefer-stateless-function
class Textbox extends React.Component<TextboxProps, TextBoxState> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    const { cbFromParent } = this.props;
    if (cbFromParent) cbFromParent(event.target.value);
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <input className="textbox" type="text" value={value} onChange={this.handleChange} />
    );
  }
}

export default Textbox;
