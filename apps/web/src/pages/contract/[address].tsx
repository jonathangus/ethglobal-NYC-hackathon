import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Text, Button } from '@nextui-org/react';
import useAxios from 'axios-hooks';
import { useProvider, useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';

import useContractWrite from '../../hooks/useWriteContract';
import useReadContract from '../../hooks/useReadContract';
import { useEffect, useState } from 'react';
import { MyNFT__factory } from 'web3-config';
import Roadmap from '../../components/Roadmap';

const AddressExpanded = () => {
  const router = useRouter();
  const { address: contractAddress }: { address?: string } = router.query;
  const provider = useProvider();
  const { data: { address: connectedAddress } = {} } = useAccount();
  const [contractBalance, setContractBalance] = useState<string>();
  const [started, setStarted] = useState(false);
  const [, abortProject] = useContractWrite(MyNFT__factory, 'abort');
  const [, claimNfts] = useContractWrite(MyNFT__factory, 'claimRefund');
  const { data: contractOwner } = useReadContract(MyNFT__factory, 'owner');
  const { data: isContractReverted } = useReadContract(
    MyNFT__factory,
    'reverted'
  );
  const { data: stepsCompleted } = useReadContract(
    MyNFT__factory,
    'stepsCompleted'
  );

  const [{ data: accountAssets = {}, loading }, getAccountAssets] = useAxios(
    {
      url: '/api/alchemy',
      method: 'POST',
      data: {
        path: `getNFTs/?owner=${connectedAddress}&contractAddresses[]=${contractAddress}`,
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
      fetchBalance();
      getAccountAssets();
    }
  }, [contractAddress]);

  useEffect(() => {
    setStarted(true);
  }, []);
  if (!started) {
    return null;
  }

  if (loading) {
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
              <Text h4>MyNFT</Text>
              <Text h6>{contractAddress}</Text>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Text h4>Balance: {contractBalance} ETH</Text>
            </Col>
          </Container>
        </Card.Header>
        <Card.Body>
          <Roadmap stepsCompleted={stepsCompleted.toNumber()}></Roadmap>
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Button
              disabled={contractOwner !== connectedAddress}
              onClick={() => abortProject()}
            >
              Abandon
            </Button>
            <Button
              disabled={accountAssets?.totalCount < 1 || !isContractReverted}
              onClick={() =>
                claimNfts({
                  params: [accountAssets.ownedNfts.map((aa) => aa.id.tokenId)],
                })
              }
            >
              Claim
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AddressExpanded;
