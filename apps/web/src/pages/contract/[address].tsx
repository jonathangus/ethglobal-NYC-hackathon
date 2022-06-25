import { Container, Row, Col, Card, Text, Button } from '@nextui-org/react';

const steps = [{ completed: true, id: 1, message: 'Jattebra NYC' }];

const AddressExpanded = () => {
  return (
    <Container
      fluid
      css={{
        margin: 'auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card css={{ mw: '720px', mh: '500px' }}>
        <Card.Header>
          <Container
            display="flex"
            direction="column"
            css={{ flexFlow: 'nowrap' }}
          >
            <Col>
              <Text h4>Contract nane</Text>
              <Text h6>0x9AA48Bb538206d5D7329aafd17B63562e7c98457</Text>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Text h4>Balance: 38ETH</Text>
              <Text h6>Minted 50/100</Text>
            </Col>
          </Container>
        </Card.Header>
        <Card.Body>
          {steps.map((s) => (
            <Row key={s.id}>
              <Text>{s.message}</Text>
            </Row>
          ))}
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Button disabled>Abandon</Button>
            <Button>Claim</Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AddressExpanded;
