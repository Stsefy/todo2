import { Component } from "react";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import statuses from "../constants/statuses";

class Task extends Component {
  adjustEnter = ({ currentTarget }) => currentTarget.classList.add("show");
  adjustLeave = ({ currentTarget }) => currentTarget.classList.remove("show");

  shouldComponentUpdate(prevProps) {
    const { task } = this.props;
    if (task.done !== prevProps.task.done) return true;
    return false;
  }

  render() {
    const { task, checkTask, dropTask } = this.props;

    return (
      <li
        className={`task flex bg-white p-1 border border-black ${
          task.done ? "task-done" : ""
        }`}
        onMouseEnter={this.adjustEnter}
        onMouseLeave={this.adjustLeave}
      >
        <input
          className="mt-1 self-start"
          type="checkbox"
          checked={task.done}
          onChange={checkTask}
        />
        <div className="flex flex-col flex-1 gap-1 mx-1 w-full">
          <p>{task.title}</p>
          <p className="text-gray-500">{task.desc}</p>
          <p
            className={`bg-gray-300 px-2 py-0.5 self-start task-type-${statuses.indexOf(
              task.severity
            )}`}
          >
            {task.severity}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between gap-1">
          <p className="text-gray-500 text-xs text-right">{task.created}</p>
          <Button
            className="task__button hidden font-light text-white bg-red-600"
            text="Удалить"
            onClick={dropTask}
          />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    done: PropTypes.bool.isRequired,
    severity: PropTypes.string.isRequired,
    created: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  checkTask: PropTypes.func.isRequired,
  dropTask: PropTypes.func.isRequired,
};

export default Task;
