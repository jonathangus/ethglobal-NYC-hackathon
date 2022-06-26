import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const OS_BASE_URL = 'https://testnets-api.opensea.io/api/v1';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log(`${OS_BASE_URL}/${req.body.path}`);
    const { data } = await axios({
      method: 'GET',
      url: `${OS_BASE_URL}/${req.body.path}`,
    });

    return res.status(200).json(data);
  } else {
    return res.status(400).json({ message: 'Request method must be POST' });
  }
};

export default handler;
