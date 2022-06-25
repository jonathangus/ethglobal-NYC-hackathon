import React from "react";
import { Avatar, Grid, Text } from "@nextui-org/react";


function Task({ step, title, description, isActive, isDone, isLast }) {
  return (
    <Grid>
      <Grid.Container className="task" direction="row">
        <Avatar 
          squared
          className={isActive ? "step active" : "step"}
          text={isDone ? "✔" : step.toString()}
          color={isDone ? "success" : 'default'}
        >
        </Avatar>

        <div style={{marginLeft: '12px'}}>
          <Text
            h5
            // css={{
            //   textGradient: "45deg, $blue600 -20%, $pink600 50%",
            // }}
            weight="bold"
          >
            {title} 
          </Text>
          <Text  size={12}> {description} </Text>
        </div>
      </Grid.Container>
    </Grid>
  );
}

export default Task;