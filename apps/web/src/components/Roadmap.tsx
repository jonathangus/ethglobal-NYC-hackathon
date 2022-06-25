import React, { useState } from "react";
import Task from "../components/Task";

function Roadmap() {
  const [currentTask, setCurrentTask] = useState(0);

  const [tasks] = useState([
    {
      id: 1,
      title: "First",
      description: "Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      title: "Second",
      description: "Lorem ipsum dolor sit",
    },
    {
      id: 3,
      title: "Third",
      description: "Lorem ipsum dolor sit sam",
    },
    {
      id: 4,
      title: "Fourth",
      description: "Lorem ipsum dolor sit amet.",
    },
  ]);

  return (
    <>
      <div>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            step={index + 1}
            isDone={currentTask > index}
            isActive={currentTask === index}
            isLast={index + 1 >= tasks.length}
          />
        ))}
      </div>

      <div className="buttons">
        <button
          onClick={() => currentTask > 0 && setCurrentTask(currentTask - 1)}
          disabled={currentTask <= 0}
          className={currentTask <= 0 ? "disabled" : ""}
        >
          Back
        </button>
        <button
          onClick={() =>
            currentTask < tasks.length && setCurrentTask(currentTask + 1)
          }
          disabled={currentTask >= tasks.length}
          className={currentTask >= tasks.length ? "disabled" : ""}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Roadmap;