import React, { Component } from "react";
import Task from "./Task";
//props
//tasks:[]

class TaskContainer extends Component {
  render() {
    return (
      <div
        style={{ display: "flex", flexWrap: "wrap",
         justifyContent: "center" }}
      >
        {this.props.tasks &&
          this.props.tasks.map((task) => (
            <Task
              dark={this.props.dark}
              actions={this.props.actions}
              task={task}
            />
          ))}
      </div>
    );
  }
}

export default TaskContainer;
