import AsyncStorage from '@react-native-async-storage/async-storage';

const callToBackend = async (endpoint, params, callback, error, method) => {
  // get the token from local storage
  let jsonToken = await AsyncStorage.getItem('@token')
  jsonToken = await JSON.parse(jsonToken)

  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + jsonToken);
  myHeaders.append("Content-Type", "application/json");

  var raw = params ? JSON.stringify(params) : null;

  if (method === "POST") {
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  }
  else if (method === "GET") {
    var requestOptions = {
      method: method,
      headers: myHeaders,
      redirect: 'follow'
    };
  }


  fetch(`https://app.keibell.com/api/${endpoint}`, requestOptions)
    .then(response => response.json())
    .then((result) => {
      console.log(result)
      callback(result);
    })
    .catch(error => console.log('error', error))
}

export default callToBackend;