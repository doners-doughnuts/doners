# Truffle

---

- 블록체인 테스팅 프레임워크

## 사용방법

---

- 설치
  - `npm i -g truffle`
  - `truffle init`
    - contract/Migration.sol
    - migrations/1_initial_migration
      - Migration.sol을 deploy한다.
    - truffle-config.js
      - 트러플의 네트워크 환경을 설정할 수 있다.
  - `const HDWalletProvider = require(’@truffle/hdwallet-provider’); const fs = require(’fs’); const mnemonic = fs.readFildeSync(”.secret”).toString().trim();` - `npm i -g @truffle/HDWalletProvider` - 트러플 네트워크 인증 방식이 두 가지로 이루어져있다. - Private Key/ mnemonic - Private Key: 지갑 어카운트의 비공개키 - mnemonic: 지갑 가입 시 12가지 영어 단어
- 배포
  - `truffle migrate —network <name>`
    - truffle migrate 뒤 옵션 설정이 없으면 기본적으로 development로 배포된다.
    - network 명령어 뒤에 name을 설정하면 network를 설정할 수 있다.
  - `truffle test ./path/test/test.js`
    - truffle test를 통해서 배포된 contract의 작동을 확인한다.
  - `truffle console —network <name>`
    - truffle console을 이용하여 직접적으로 네트워크에 접근할 수 있다.
    - 기본 값은 development이며 network를 설정하면 설정된 network에 배포한 컨트랙트를 확인하여 사용할 수있다.
- ganache
  - local환경 contract 배포 환경 테스트를 확인 할 수 있다.
  - `npm i ganache-cli`
    - `ganache-cli -d -m tutorial`
      - test 어카운트들을 사용할 수 있다.

## 결론

---

Truffle을 사용하여 테스트 환경을 배포하고 contract를 테스트하며 truffle console을 활용해서 배포된 contract를 활용해 볼 수 있다.
