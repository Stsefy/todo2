import { Component } from "react";
import PropTypes from "prop-types";

class Paragraph extends Component {
  render() {
    const { text } = this.props;
  
    return (
      <p className="bg-gray-300 py-1 px-4 min-w-32 text-center font-bold self-start">
        {text}
      </p>
    );
  }
}

Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Paragraph;