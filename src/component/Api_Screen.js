const baseUrl = 'https://intechsol.co/kuwait/api/';

const PostAPiwithFrom = async (payload, data) => {
  console.log('payload', payload);
  console.log('payload', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    });

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

const AllPostApi = async payload => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
const PostAPiwithToken = async (payload, data) => {
  console.log('payoadddddddddddddddddddddd', payload);
  console.log('datassasdddddddddddddddddddddd', data);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Token}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const AllPostwithAppication = async payload => {
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Token}`,
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const AllGetAPI = async (payload, data) => {
  console.log('payload', payload);
  try {
    const request = baseUrl + `${payload.url}`;
    const response = await fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.Token}`,
      },
      body: data,
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export {PostAPiwithFrom, PostAPiwithToken, AllGetAPI};
