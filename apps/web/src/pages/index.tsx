import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Input, Button, Text } from '@nextui-org/react';
import { useNotifications } from 'reapop';
import useAddress from '../hooks/useAddress';
import { MyNFT__factory } from 'web3-config';

const ADDRESS_REGEX = /^0x[0-9a-f]{40}$/i;

const Page = () => {
  const router = useRouter();
  const address = useAddress(MyNFT__factory);
  const [contractAddress, setContractAddress] = useState(address);
  const { notify } = useNotifications();
  const handleAddressLookup = () => {
    if (ADDRESS_REGEX.test(address)) {
      router.push(`/contract/${address}`);
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
        <>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $yellow600 -20%, $red600 100%',
            }}
            weight="bold"
          >
            Bring trust to your NFT project
          </Text>
        </>
        <Row style={{ marginTop: '38px' }}>
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
            css={{ margin: '18px auto', width: '100%' }}
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
