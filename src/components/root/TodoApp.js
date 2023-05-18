import React, { Component } from "react";
import { Button, Container, Input } from "reactstrap";
import TaskContainer from "../toolbox/TaskContainer";
import Switch from "react-switch";
import * as alertify from "alertifyjs";
class TodoApp extends Component {
  state = {
    tasks: [], dark: false, title: "",
    description: "", darkMode: false,
  };

  componentDidUpdate(prevState,prevProps){
   
    if(prevState.tasks!=this.state.tasks){
      this.writeLocalStore("tasks",this.state.tasks)
      }
      if(prevState.dark!=this.state.dark){
        this.writeLocalStore("dark",this.state.dark)
        }


        
  }

  componentDidMount(){

    this.setState({tasks:this.getValueByLocalSore("tasks")||[]})
    this.setState({dark:this.getValueByLocalSore("dark")||false})
    
  }

  writeLocalStore=(key,value)=>{
    
    localStorage.setItem(key,JSON.stringify(value))
  }

  getValueByLocalSore=(key)=>{
    return JSON.parse(localStorage.getItem(key))
  }
  onChangeEvent = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteTask = (task) => {
    this.setState({ tasks: this.state.tasks.filter((t) => t !== task) });
  };

  completeTask = (task) => {
    let completedTask = this.state.tasks.find((t) => t === task);
    if (completedTask) {
      task.complete = true;
    }
    this.setState({ tasks: [...this.state.tasks] });
  };

  addTask = () => {
    if (this.state.title === "") {
      alertify.error("Lütfen başlık giriniz", 2);
    } else if (this.state.description === "") {
      alertify.error("Lütfen içerik giriniz", 2);
    } else {
      this.setState({
        tasks: [
          {
            title: this.state.title, description: this.state.description,
            date: new Date().toLocaleString(),
          },
          ...this.state.tasks,
        ],
      });
      this.clearTexts()
    }
  };
  clearTexts = () => {
    this.setState({title:""})
    this.setState({description:""})
  };

  render() {
    return (
      <div
        style={{
          position: "fixed", transition: "500ms all",
          top: 0,left: 0, right: 0, bottom: 0,overflowY: "scroll",
          color: this.state.dark ? "white" : "black",
          backgroundColor: this.state.dark ? "" : "goldenrod",
        }}
        className={`  ${this.state.dark ? "bg-dark" : ""}`}
      >
        <h1
          className="text-center p-3 my-2"
          style={{ backgroundColor: this.state.dark ? "gray" : " lightgoldenrodyellow", }}
        >
          Yapılacaklar Listesi </h1>
        <div
          className="d-flex align-itms-center py-1 rounded-3 px-2"
          style={{
            alignItems: "end", position: "absolute",
            top: "0", right: "0",
            backgroundColor: this.state.dark ? "gray" : " lightgoldenrodyellow",
          }}
        >
          <label style={{ fontSize: "20px" }}>Gece Modu:</label>
          <Switch
            checked={this.state.dark}
            onChange={() => this.setState({ dark: !this.state.dark })}
          />
        </div>

        <Container>
          <div className="d-flex">
            <Input
              className="mx-2" name="title" type="text"
              value={this.state.title} onChange={this.onChangeEvent}
              placeholder="Başlık Giriniz"
            />
            <Input
              className="mx-2" name="description"  type="text"
              value={this.state.description} onChange={this.onChangeEvent}
              placeholder="İçerik Giriniz"
            />
            <Button color="success" onClick={(event) => this.addTask(event)}>
              Ekle
            </Button>
          </div>
          <TaskContainer
            dark={this.state.dark}
            actions={{
              addTask: this.addTask,
              deleteTask: this.deleteTask,
              completeTask: this.completeTask,
            }}
            tasks={this.state.tasks}
          />
        </Container>
      </div>
    );
  }
}
export default TodoApp;
