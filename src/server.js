// const breeds = [
//   {
//     "id": "",
//     "name": "",
//     "description": "",
//     "temperament": "",
//     "url": "199035"
//   },
// ];

const breeds = [
  {
    "id":"ebv",
     "url":"https://cdn2.thecatapi.com/images/ebv.jpg",
     "width":176,"height":540,
     "breeds":[],
     "favourite":{}
  },
];




export default function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/json'
  });
  res.write(JSON.stringify(breeds));
  res.end();
};