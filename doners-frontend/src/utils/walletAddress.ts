/* 사용자의 지갑 주소 */
export const getWalletAccount = async () => {
  try {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      return accounts[0];
    } else {
      alert('Metamask를 설치해주세요!');
      // eslint-disable-next-line no-restricted-globals
      location.href = 'https://metamask.io/download/';
    }
  } catch (error) {
    console.log(error);
  }
};
