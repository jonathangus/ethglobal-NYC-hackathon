import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Text, Button } from '@nextui-org/react';
import useAxios from 'axios-hooks';
import { useProvider, useAccount } from 'wagmi';
import { ethers } from 'ethers';

import useReadContract from '../../hooks/useReadContract';
import useContractWrite from '../../hooks/useWriteContract';
import useAddress from '../../hooks/useAddress';
import { useEffect, useState } from 'react';
import { MyNFT__factory } from 'web3-config';

const steps = [{ completed: true, id: 1, message: 'Jattebra NYC' }];

const AddressExpanded = () => {
  const router = useRouter();
  const { address: contractAddress }: { address?: string } = router.query;
  const provider = useProvider();
  const { data: { address: connectedAddress } = {} } = useAccount();
  const [contractBalance, setContractBalance] = useState<string>();
  const [started, setStarted] = useState(false);
  const [, abortProject] = useContractWrite(MyNFT__factory, 'abort');
  const [, claimNfts] = useContractWrite(MyNFT__factory, 'claimAbort');

  const [
    { data: { assets: accountAssets = [] } = {}, loading },
    getAccountAssets,
  ] = useAxios(
    {
      url: '/api/opensea',
      method: 'POST',
      data: {
        path: `assets?owner=${connectedAddress}&asset_contract_address=${contractAddress}`,
      },
    },
    { manual: true }
  );

  const [
    { data: collectionData, loading: collectionDataLoading },
    getCollection,
  ] = useAxios(
    {
      url: '/api/opensea',
      method: 'POST',
      data: {
        path: `asset_contract/${contractAddress}`,
      },
    },
    { manual: true }
  );

  useEffect(() => {
    const fetchBalance = async () => {
      const contractBalanceRes = await provider.getBalance(contractAddress);
      setContractBalance(ethers.utils.formatEther(contractBalanceRes));
    };

    if (contractAddress) {
      getCollection();
      fetchBalance();
      getAccountAssets();
    }
  }, [contractAddress]);

  // const { data, error } = useReadContract(MyNFT__factory, 'b', {
  //   params: [accountData?.address as string],
  //   enabled: !!accountData?.address,
  // });

  useEffect(() => {
    setStarted(true);
  }, []);
  if (!started) {
    return null;
  }

  if (collectionDataLoading || !collectionData || loading) {
    return <div>Loading...</div>;
  }

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
              <Text h4>{collectionData.name}</Text>
              <Text h6>{contractAddress}</Text>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Text h4>Balance: {contractBalance} ETH</Text>
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
            <Button onClick={() => abortProject()}>Abandon</Button>
            <Button onClick={() => claimNfts()}>Claim</Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AddressExpanded;
