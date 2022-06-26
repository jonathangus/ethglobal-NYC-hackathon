import React from 'react';
import { Avatar, Button, Grid, Loading, Text } from '@nextui-org/react';
import useReadContract from '../hooks/useReadContract';
import useContractWrite from '../hooks/useWriteContract';
import { MyNFT__factory } from 'web3-config';

function Task({ step, title, description, isActive, isDone, isLast, func }) {
  const { data: canExecute } = useReadContract(MyNFT__factory, func);

  const [{ loading }, execute] = useContractWrite(
    MyNFT__factory,
    'executeStep'
  );

  return (
    <Grid>
      <Grid.Container className="task" direction="row">
        <Avatar
          squared
          className={isActive ? 'step active' : 'step'}
          text={isDone ? '✔' : step.toString()}
          color={isDone ? 'success' : 'default'}
        ></Avatar>

        <div style={{ marginLeft: '12px', justifyContent: 'space-between' }}>
          <Text h5 weight="bold">
            {title}
          </Text>
          <Text size={12}> {description} </Text>
        </div>

        {!isDone && (
          <Button
            style={{ marginLeft: '12px' }}
            size="xs"
            disabled={!canExecute}
            onClick={() => {
              console.log(step);

              execute({
                params: [step],
              });
            }}
          >
            {loading ? <Loading color={'white'} /> : 'execute'}
          </Button>
        )}
      </Grid.Container>
    </Grid>
  );
}

export default Task;
