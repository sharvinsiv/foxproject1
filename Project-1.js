import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const url = 'https://randomfox.ca/floof/'; 
    const data = await fetch(url).then(r => r.json());
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ photos: [] });
  }
}

