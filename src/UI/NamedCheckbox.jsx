import { Component } from "react";
import PropTypes from "prop-types";

class NamedCheckbox extends Component {
  render() {
    const { text, value, onChange } = this.props;
  
    return (
      <div className="flex">
        <input
          className="px-2 py-1 my-1 self-start"
          type="checkbox"
          value={value}
          onChange={onChange}
        />
        <p className="mx-1">{text}</p>
      </div>
    );
  }
}

NamedCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default NamedCheckbox;