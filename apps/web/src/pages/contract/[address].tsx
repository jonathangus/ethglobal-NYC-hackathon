import { useRouter } from 'next/router';
import {
  Container,
  Row,
  Col,
  Card,
  Text,
  Button,
  Image,
} from '@nextui-org/react';
import useAxios from 'axios-hooks';
import { useProvider, useAccount, useContractRead } from 'wagmi';
import { ethers } from 'ethers';

import useContractWrite from '../../hooks/useWriteContract';
import useReadContract from '../../hooks/useReadContract';
import { useEffect, useState } from 'react';
import { MyNFT__factory } from 'web3-config';
import Roadmap from '../../components/Roadmap';
import Mint from '../../components/Mint';

const AddressExpanded = () => {
  const router = useRouter();
  const { address: contractAddress }: { address?: string } = router.query;
  const provider = useProvider();
  const { data: { address: connectedAddress } = {} } = useAccount();
  const [contractBalance, setContractBalance] = useState<string>();
  const [started, setStarted] = useState(false);
  const [, abortProject] = useContractWrite(MyNFT__factory, 'abort');
  const [, claimNfts] = useContractWrite(MyNFT__factory, 'claimRefund');
  const [, approveNfts] = useContractWrite(MyNFT__factory, 'setApprovalForAll');
  const { data: contractOwner } = useReadContract(MyNFT__factory, 'owner');
  const { data: isContractReverted } = useReadContract(
    MyNFT__factory,
    'reverted'
  );
  const { data: totalSupply = ethers.BigNumber.from(0) } = useReadContract(
    MyNFT__factory,
    'totalSupply'
  );
  const { data: isApprovedForAll } = useReadContract(
    MyNFT__factory,
    'isApprovedForAll',
    { params: [connectedAddress, contractAddress] }
  );

  console.log({ totalSupply });
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

  const doesAddressOwnNfts = accountAssets?.totalCount > 1;

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
      <Card css={{ mw: '780px', mh: '700px' }}>
        <Card.Header>
          <Image
            alt="nyc"
            css={{ height: '100px' }}
            src="https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2974&q=80"
          />
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
              <Text h4>Total supply: {totalSupply.toNumber()}</Text>
              <Text h4>You own: {accountAssets.ownedNfts?.length}</Text>
            </Col>
          </Container>
        </Card.Header>
        <Card.Body>
          <Roadmap stepsCompleted={stepsCompleted?.toNumber()}></Roadmap>
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
              disabled={!doesAddressOwnNfts || !isContractReverted}
              onClick={() => {
                if (!isApprovedForAll) {
                  approveNfts({ params: [contractAddress, true] });
                } else {
                  claimNfts({
                    params: [
                      accountAssets.ownedNfts.map((aa) =>
                        ethers.BigNumber.from(aa.id.tokenId).toNumber()
                      ),
                    ],
                  });
                }
              }}
            >
              Claim
            </Button>
          </Row>
        </Card.Footer>
      </Card>
      <Mint />
    </Container>
  );
};

export default AddressExpanded;
