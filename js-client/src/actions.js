//@flow

import fetch from 'isomorphic-fetch';

const getStuff = (): Promise<any> => {
  return fetch('/api')
    .then(response => response.text())
    .then((text: string) => console.log(text))
}

export default getStuff;
