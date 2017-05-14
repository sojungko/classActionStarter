import axios from 'axios';

export function participate(infoObj) {
  axios.post('/post/participate', infoObj)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
