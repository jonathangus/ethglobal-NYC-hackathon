import React from "react";

function Task({ step, title, description, isActive, isDone, isLast }) {
  return (
    <div className="task">
      <div className={isActive ? "step active" : "step"}>
        {isDone ? "✔" : step}
        {!isLast && (
          <span className={isDone ? "connector done" : "connector"}></span>
        )}
      </div>

      <div className={isActive ? "task-info acitve-task-info" : "task-info"}>
        <div className="title"> {title} </div>
        <div className="description"> {description} </div>
      </div>
    </div>
  );
}

export default Task;