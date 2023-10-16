const bearerToken = 'eyJraWQiOiJUMEExWGlHUE9PMDdqNmhjbzMzMk1mXC9WZzZ3NlVVc1RUWW5VSnFCS1Vpaz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwNDY2NzA4Yi0zZGM0LTQ0NTMtYjBmOC05N2IwOGUwNTM3MTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMjAxMy0xMi0xMiIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0xX09MVnV4Tjd2NSIsImNvZ25pdG86dXNlcm5hbWUiOiJ0ZXN0MDAxQGVsZGFhcy5jb20iLCJnaXZlbl9uYW1lIjoiZmlyc3ROYW1lIiwibWlkZGxlX25hbWUiOiJtaWRkbGVOYW1lIiwib3JpZ2luX2p0aSI6IjU1NTlhNDI3LWI1ZjYtNGY4NS05OWNlLWZkMTk1NDRiMzE0YyIsImF1ZCI6IjdkaTExMXFzdWtkMHBnYzY3YnJzZG0xODdnIiwiZXZlbnRfaWQiOiJhYzM3NDNhZC1kNTgyLTRjZWUtODdiMS1mNjI5MDcyZjExOTciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY5MTA1NjQ5NCwicGhvbmVfbnVtYmVyIjoiKzkxNzQ3ODg0Mzg2NiIsImV4cCI6MTY5MTA2MDA5NCwiaWF0IjoxNjkxMDU2NDk0LCJmYW1pbHlfbmFtZSI6Imxhc3ROYW1lIiwianRpIjoiMjQ5NDAyZGMtN2Y4My00ZGY4LWIzM2EtZDk2NGM1MDYzMTUyIiwiZW1haWwiOiJ0ZXN0MDAxQGVsZGFhcy5jb20ifQ.zShHV__6gK_Jn9jvzCd5lDg02QrN-6ULp1y1ImoOmu8JlN_cDMPcJx3CI0aib1d2GM5XoHxjcTGcuRU2NpnTUqQNDOJ5C6wgwcYHEIfkmUAeCG1ms7uZN9Neg-y3sNW-2v7HIYzfimY8oS0WE7XQHheuY9nEAgfa8DeWbZmL0kEtNv0C3NfbmwZus4YC30ShWv7qryAvbr4i6owRta-bsnkf6vl2hSoxytGbIP8RZEqjUxYgMpNCLI_lsvY9xuAmmIBhf06sKXnLquEPO1vjWJnyCvmmWXbgqDfLUztayHNBgOJ-LDEI5DfidzB72LHLVrfouY8w34chbqugofsPxw'; //bearer token


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
