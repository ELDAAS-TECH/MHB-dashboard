const bearerToken = 'eyJraWQiOiJUMEExWGlHUE9PMDdqNmhjbzMzMk1mXC9WZzZ3NlVVc1RUWW5VSnFCS1Vpaz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDY2NzA4Yi0zZGM0LTQ0NTMtYjBmOC05N2IwOGUwNTM3MTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMjAxMy0xMi0xMiIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0xX09MVnV4Tjd2NSIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0MDAxQGVsZGFhcy5jb20iLCJnaXZlbl9uYW1lIjoiZmlyc3ROYW1lIiwibWlkZGxlX25hbWUiOiJtaWRkbGVOYW1lIiwib3JpZ2luX2p0aSI6ImUzOWNmYTJkLTY4MzItNDk1ZC05NmI5LTg0MmFkNjliZTU3NSIsImF1ZCI6IjdkaTExMXFzdWtkMHBnYzY3YnJzZG0xODdnIiwiZXZlbnRfaWQiOiIyYmMxOTViZC0zM2NmLTQ2NjItYWM5ZS1kMWUyNGIyZjkyYTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5NzQ0ODE3NSwicGhvbmVfbnVtYmVyIjoiKzkxNzQ3ODg0Mzg2NiIsImV4cCI6MTY5NzQ1MTc3NSwiaWF0IjoxNjk3NDQ4MTc1LCJmYW1pbHlfbmFtZSI6Imxhc3ROYW1lIiwianRpIjoiNjMwNjExODYtMWRjNC00OTkxLTlmNzctZjBhOGUyZjBmYzQyIiwiZW1haWwiOiJ0ZXN0MDAxQGVsZGFhcy5jb20ifQ.g7locp_PaPfMu6LLZsNneE1hkcywTW6ooRekqO1-xu0FFKp6A4WZioCTvDBw4_Fn8BhXQLT2oz5WCDqjoFjgb4vGzJTHWK_yuV4_B-vJycenVEVwXfyV4tqg2bfhoixF7wfQDZQCKRXsXv_0Gyybem7Qb5ztPJj_JeeUIyt_RHMqdFOig2B0liaQF_3fPvFIneWXiBDYOectAnuNSKOlm50Ew9od-fB0P25L9PbZU9ed_ZwEwDwMWZPEhQh3CWoBQlrDfEWEiOdgfjfxnpME2AJzPUK2OMBF49pbmsDy0f09SSdBwBKEM9QSPQx8tYZrkb_Ozhad9JrHDsSoBGv5iA'; //bearer token


const awsUrl = 'https://kt34btvfk8.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users/getUsers'; 

async function processJsonData() {
  try {
    const response = await fetch(awsUrl, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the JSON file');
    }

    const data = await response.json();

    
    if (!Array.isArray(data.userList)) {
      throw new Error('User list not found or not in the expected format');
    }

    const desiredAttributes = data.userList.map(item => {
      const subAttr = item.attributes.find(attr => attr.Name === 'sub');
      const emailAttr = item.attributes.find(attr => attr.Name === 'email');
      const givenNameAttr = item.attributes.find(attr => attr.Name === 'given_name');
      const middleNameAttr = item.attributes.find(attr => attr.Name === 'middle_name');
      const familyNameAttr = item.attributes.find(attr => attr.Name === 'family_name');
      const birthdateAttr = item.attributes.find(attr => attr.Name === 'birthdate');
      const phoneNumberAttr = item.attributes.find(attr => attr.Name === 'phone_number');

      return {
        sub: subAttr ? subAttr.Value : '',
        email: emailAttr ? emailAttr.Value : '',
        given_name: givenNameAttr ? givenNameAttr.Value : '',
        middle_name: middleNameAttr ? middleNameAttr.Value : '',
        family_name: familyNameAttr ? familyNameAttr.Value : '',
        birthdate: birthdateAttr ? birthdateAttr.Value : '',
        phone_number: phoneNumberAttr ? phoneNumberAttr.Value : '',
      };
    });

    return desiredAttributes; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
}

export { processJsonData };
