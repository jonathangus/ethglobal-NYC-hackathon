import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Input, Button } from '@nextui-org/react';
import { useNotifications } from 'reapop';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const ADDRESS_REGEX = /^0x[0-9a-f]{40}$/i;

const Page = () => {
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState('');
  const { notify } = useNotifications();

  const handleAddressLookup = () => {
    if (ADDRESS_REGEX.test(contractAddress)) {
      router.push(`/contract/${contractAddress}`);
    } else {
      notify(`${contractAddress} is not a valid address`, 'error');
    }
  };

  return (
    <Container fluid css={{ height: '100%' }}>
      <Container
        display="flex"
        wrap="nowrap"
        direction="column"
        justify="center"
        css={{
          maxWidth: 700,
          margin: 'auto',
          height: 'calc(100% - 50px)',
        }}
      >
        <Row>
          <Input
            fullWidth
            placeholder="Enter contract address"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </Row>
        <Row>
          <Button
            color="primary"
            css={{ margin: '8px auto' }}
            onClick={handleAddressLookup}
          >
            Look up
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default Page;
