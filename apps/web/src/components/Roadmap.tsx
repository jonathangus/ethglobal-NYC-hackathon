import React, { useState } from "react";
import Task from "../components/Task";
import { Avatar, Grid } from "@nextui-org/react";

function Roadmap({stepsCompleted}) {
  console.log("Steps Completed:", stepsCompleted)

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
      <Grid.Container gap={2} direction='column'>
        {tasks.map((task, index) => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
            step={index + 1}
            isDone={stepsCompleted > index}
            isActive={stepsCompleted === index}
            isLast={index + 1 >= tasks.length}
          />
        ))}
      </Grid.Container>
    </>
  );
}

export default Roadmap;