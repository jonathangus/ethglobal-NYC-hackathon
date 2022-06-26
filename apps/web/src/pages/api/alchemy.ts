import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// replace with your Alchemy api key
const apiKey = 'DB8XDJ0TFFQBY5_3yACW1PODLm8o8aVb';
const baseURL = `https://eth-kovan.alchemyapi.io/nft/v2/${apiKey}`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { data } = await axios({
      method: 'GET',
      url: `${baseURL}/${req.body.path}`,
    });

    return res.status(200).json(data);
  } else {
    return res.status(400).json({ message: 'Request method must be POST' });
  }
};

export default handler;
