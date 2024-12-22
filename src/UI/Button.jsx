import { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    const { className, text, value, disabled, onClick } = this.props;
  
    return (
      <button
        className={`bg-gray-300
          px-4
          py-1.5
          border-none
          text-sm
          cursor-pointer
          self-end
        ${className || ''}`}
        value={value}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Button;