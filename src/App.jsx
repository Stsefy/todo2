import { Component } from "react";
import Form from "./components/Form.jsx";
import Task from "./components/Task.jsx";
import Paragraph from "./UI/Paragraph.jsx";
import NamedCheckbox from "./UI/NamedCheckbox.jsx";
import Button from "./UI/Button.jsx";
import { getTaskList } from "./helpers/getTaskList.js";
import getFormattedDate from "./helpers/getFormatDate.js";
import toggle from "./helpers/toggle.js";
import statuses from "./constants/statuses.js";

const TASK_AMOUNT = 1000;

const sortByDone = (arrayOfObj) =>
  arrayOfObj.sort((obj1, obj2) => +obj1.done > +obj2.done);

const isSearched = (title, desc, search) => {
  const _title = title.toLowerCase();
  const _desc = desc?.toLowerCase();
  const _search = search.toLowerCase();
  return _title.includes(_search) || _desc?.includes(_search);
};

const isTaskFiltered = (filters, task) => {
  const { filterByDone, filterBySearch, filterByType } = filters;
  let [byDone, bySearch, byType] = [false, false, false];

  if (filterByDone && task.done) {
    byDone = true;
  }
  if (filterBySearch) {
    bySearch = !isSearched(task.title, task.desc, filterBySearch);
  }
  if (filterByType.length) {
    byType = !filterByType.includes(task.severity);
  }
  return byDone || bySearch || byType;
};

const getSeverityCollection = (tasks) => [
  ...new Set(tasks.map(({ severity }) => severity)),
];

class App extends Component {
  state = {
    title: "",
    desc: "",
    severity: statuses[1],
    tasks: [],
    filterByDone: false,
    filterBySearch: "",
    filterByType: [],
  };

  adjustTitle = ({ target }) => this.setState({ title: target.value });
  adjustDesc = ({ target }) => this.setState({ desc: target.value });
  adjustSeverity = (e) => {
    e.preventDefault();
    this.setState({ severity: e.target.value });
  };
  adjustFilterDone = () =>
    this.setState({ filterByDone: !this.state.filterByDone });
  adjustFilterSearch = ({ target }) =>
    this.setState({ filterBySearch: target.value });
  adjustFilterType = ({ target }) =>
    this.setState({
      filterByType: toggle(this.state.filterByType, target.value),
    });

  addTask = (e) => {
    e.preventDefault();
    this.setState({
      title: "",
      desc: "",
      tasks: sortByDone([
        ...this.state.tasks,
        {
          id: Date.now(),
          title: this.state.title,
          desc: this.state.desc,
          severity: this.state.severity,
          created: getFormattedDate(Date.now()),
          done: false,
        },
      ]),
    });
  };

  addMultipleTask = () => {
    this.setState({
      tasks: sortByDone([...this.state.tasks, ...getTaskList(TASK_AMOUNT)]),
    });
  };

  checkTask = (taskId) => {
    this.setState({
      tasks: sortByDone(
        this.state.tasks.map((task) => {
          if (taskId === task.id) {
            return {
              ...task,
              done: !task.done,
            };
          }
          return task;
        })
      ),
    });
  };

  dropTask = (taskId) => {
    const unfiltered = this.state.tasks;
    const filtered = unfiltered.filter((task) => taskId !== task.id);
    const unfilteredLength = getSeverityCollection(unfiltered).length;
    const filteredLength = getSeverityCollection(filtered).length;

    if (this.state.filterByType.length && unfilteredLength !== filteredLength) {
      this.setState({
        filterByType: toggle(
          this.state.filterByType,
          unfiltered.find((task) => taskId === task.id).severity
        ),
        tasks: filtered,
      });
    } else {
      this.setState({ tasks: filtered });
    }
  };

  render() {
    const hasTitleWrong = (title) =>
      title === "" || title.length !== title.trim().length;
    const hasAddBtnDisabled = hasTitleWrong(this.state.title);
    const filters = {
      filterByDone: this.state.filterByDone,
      filterBySearch: this.state.filterBySearch,
      filterByType: this.state.filterByType,
    };
    const tasks = this.state.tasks.filter(
      (task) => !isTaskFiltered(filters, task)
    );
    const severityCollection = getSeverityCollection(this.state.tasks);

    const list = () => {
      if (!this.state.tasks.length) {
        return (
          <p className="bg-white px-2 py-1 border border-black">
            Список задач пуст!
          </p>
        );
      }
      if (!tasks.length) {
        return (
          <p className="bg-white px-2 py-1 border border-black">
            По вашим критериям ничего не найдено!
          </p>
        );
      }

      return tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          checkTask={() => this.checkTask(task.id)}
          dropTask={() => this.dropTask(task.id)}
        />
      ));
    };

    const checkboxes = () => {
      return statuses.map((status) => {
        if (!severityCollection.includes(status)) {
          return null;
        }

        return (
          <NamedCheckbox
            key={status}
            text={status}
            value={status}
            onChange={this.adjustFilterType}
          />
        );
      });
    };

    return (
      <div className="app w-full max-w-3xl flex flex-col justify-between h-full">
        <div className="wrap flex">
          <div className="left min-w-32 mr-2">
            <h1 className="font-bold text-3xl my-3 uppercase">TODOIST</h1>
            <div className="bg-white px-2 py-1 mt-4">
              <NamedCheckbox
                text="Скрыть выполненные"
                onChange={this.adjustFilterDone}
              />
            </div>
            <div className="my-2">
              <Paragraph text="Важность" />
              <ul className="bg-white px-2 py-1">{checkboxes()}</ul>
            </div>
            <div>
              <Paragraph text="Тестирование" />
              <Button
                className="bg-white w-full"
                text={"Добавить 1000 задач"}
                onClick={this.addMultipleTask}
              />
            </div>
          </div>
          <div className="right w-full">
            <input
              className="my-3 p-2"
              type="text"
              placeholder="Поиск..."
              value={this.state.filterBySearch}
              onInput={this.adjustFilterSearch}
            />
            <ul className="flex flex-col gap-1 overflow-auto task-wrapper-height">
              {list()}
            </ul>
          </div>
        </div>
        <Form
          title={this.state.title}
          desc={this.state.desc}
          severity={this.state.severity}
          adjustTitle={this.adjustTitle}
          adjustDesc={this.adjustDesc}
          adjustSeverity={this.adjustSeverity}
          buttonDisabled={hasAddBtnDisabled}
          buttonClick={this.addTask}
        />
      </div>
    );
  }
}

export default App;
