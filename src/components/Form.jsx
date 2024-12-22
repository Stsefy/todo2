import { Component } from "react";
import PropTypes from "prop-types";
import Paragraph from "../UI/Paragraph";
import Button from "../UI/Button";
import statuses from "../constants/statuses";

class Form extends Component {
  render() {
    const {
      title,
      desc,
      severity,
      adjustTitle,
      adjustDesc,
      adjustSeverity,
      buttonDisabled,
      buttonClick,
    } = this.props;
  
    return (
      <form className="app__form flex flex-col bg-white p-3 gap-y-2">
        <h2 className="font-bold text-xl uppercase">Добавить задачу</h2>
        <div className="flex gap-2">
          <Paragraph text="Название" />
          <input
            className="flex-1"
            type="text"
            placeholder="Введите название задачи"
            value={title}
            onChange={adjustTitle}
          />
        </div>
        <div className="flex gap-2">
          <Paragraph text="Описание" />
          <textarea
            className="flex-1"
            name="story"
            rows="3"
            placeholder="Введите описание задачи"
            value={desc}
            onChange={adjustDesc}
          />
        </div>
        <div className="flex gap-2">
          <Paragraph text="Важность" />
          <div className="flex flex-wrap gap-2">
            {
              statuses.map((status, index) => (
                <Button
                  className={status === severity ? `task-type-${index}` : ''}
                  key={status}
                  value={status}
                  text={status}
                  onClick={adjustSeverity}
                />
              ))
            }
          </div>
        </div>
        <Button
          text="Добавить"
          disabled={buttonDisabled}
          onClick={buttonClick}
        />
      </form>
    );
  }
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string,
  severity: PropTypes.string.isRequired,
  adjustTitle: PropTypes.func.isRequired,
  adjustDesc: PropTypes.func.isRequired,
  adjustSeverity: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool,
  buttonClick: PropTypes.func.isRequired,
};

export default Form;