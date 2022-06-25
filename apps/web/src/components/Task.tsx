import React from "react";
import { Avatar, Grid } from "@nextui-org/react";


function Task({ step, title, description, isActive, isDone, isLast }) {
  return (
    <Grid className="task">
      <Avatar 
        squared
        className={isActive ? "step active" : "step"}
        text={isDone ? "✔" : step.toString()}
      >
      </Avatar>

      <div className={isActive ? "task-info acitve-task-info" : "task-info"}>
        <div className="title"> {title} </div>
        <div className="description"> {description} </div>
      </div>
    </Grid>
  );
}

export default Task;