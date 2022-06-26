import React, { useState } from "react";
import Task from "../components/Task";
import { Avatar, Grid } from "@nextui-org/react";


// constructor()
// ERC721('MyToken', 'MTK')
// SafeLaunch(RESERVED_TREASURY_AMOUNT, MINT_PRICE)
// {
// addStep('governanceIsApproved()', 'Governance approval');
// addStep('mintProgress()', 'Half minted');
// addStep('apeIsSent()', 'BAYC sent to user');
// addStep('charityIsSent()', 'Charity sent');
// }

// function mintProgress() public view returns (bool) {
// return MAX_SUPPLY / 2 < totalSupply();
// }

// function charityIsSent() public view returns (bool) {
// return charitySent;
// }

// function governanceIsApproved() public view returns (bool) {
// return governanceApproved;
// }

// function apeIsSent() public view returns (bool) {
// return apeSent;
// }


function Roadmap({stepsCompleted}) {
  console.log("Steps Completed:", stepsCompleted)

  const [tasks] = useState([
    {
      id: 1,
      title: "Governance approval",
      description: "governanceIsApproved()",
      func: "governanceIsApproved"
    },
    {
      id: 2,
      title: "Half minted",
      description: "mintProgress()",
      func: "mintProgress"
    },
    {
      id: 3,
      title: "BAYC sent to user",
      description: "apeIsSent()",
      func: "apeIsSent"
    },
    {
      id: 4,
      title: "Charity sent",
      description: "charityIsSent()",
      func: "charityIsSent"
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
            func={task.func}
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