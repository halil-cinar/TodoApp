import React, { Component } from "react";
import { Button } from "reactstrap";
//props
//task:{},complete,
class Task extends Component {
  render() {
    return (
      <div
        className={`d-flex border m-1 px-2 py-1 justify-content-between align-items-center 
        ${this.props.task.complete ? "text-muted" : "" }  `}
        style={{
          flex: "1 0 29%", maxWidth: "50%",
          opacity: this.props.task.complete ? "0.8" : "1",
          backgroundColor: this.props.dark ? "gray" : "lightgoldenrodyellow",
        }}
      >
        <div >
          <h5>{this.props.task.title}</h5>
          <p
            
            style={{
              wordWrap: "break-word",
              overflowWrap: "anywhere",
              hyphens: "auto",
              whiteSpace: "normal",
            }}
          >
            {this.props.task.description}
          </p>
          <small>{this.props.task.date}</small>
        </div>

        <div >
          <Button
            className="rounded-4 "  disabled={this.props.task.complete}
            onClick={() => this.props.actions.completeTask(this.props.task)}
            style={{ fontWeight: "bold" }}
            color="success"
          >
            ✓
          </Button>
          <Button
            className="rounded-4 px-2"
            color="danger"
            onClick={() => this.props.actions.deleteTask(this.props.task)}
          >
            ✖
          </Button>
        </div>
      </div>
    );
  }
}

export default Task;
