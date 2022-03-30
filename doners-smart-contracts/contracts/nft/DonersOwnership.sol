// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonersDoughnutsFactory.sol";

contract DonersOwnership is DonersDoughnutsFactory {
    using Counters for Counters.Counter;

    mapping(uint256 => address) ddApprovals;

    // // Mapping from token ID to owner address
    // mapping(uint256 => address) public tokenOwners;
    // // Mapping owner address to token count (-> balanceOf() openzepplin ERC721.sol 사용으로 대체)
    // mapping(address => uint256) public ownerTokenCount;

    /* minting된 NFT 관리 */
    // getter를 사용하여 총 minting된 NFT 개수를 조회할 수 있게 'public'으로 선언
    // minting된 NFT들 count
    Counters.Counter public mintedTokenIds;
    // Mapping from token ID to owner address
    mapping(uint256 => address) public tokenOwners;
    // Mapping owner address to token count (https://ethereum.stackexchange.com/a/98495)
    mapping(address => uint256[]) public userOwnedTokens;

    /* NFT minting */

    function mintToken(address owner, string memory metadataURI)
        public
        returns (uint256)
    {
        uint256 tokenId = mintedTokenIds.current();
        _safeMint(owner, tokenId);
        _setTokenURI(tokenId, metadataURI);

        // 따로 저장
        userOwnedTokens[msg.sender].push(tokenId);

        mintedTokenIds.increment();
        return tokenId;
    }

    // 해당 account의 NFT 목록
    // -> 위의 "userOwnedTokens" getter 호출로 대체 (contractInstance.methods.userOwnedTokens.call(address) // THIS WILL RETURN AN ARRAY OF TOKEN IDs)
    // function getTokensByOwner(address _owner)
    //     public
    //     view
    //     returns (DDToken[] memory)
    // {
    //     uint256 totalCnt = mintedTokenIds.current();
    //     uint256 tokenId = 0;
    //     uint256 counter = 0;

    //     // DDToken[] memory list;
    //     DDToken[] memory list = new DDToken[](totalCnt);

    //     for (uint256 i = 0; i < totalCnt; i++) {
    //         // mint가 된 NFT && NFT의 owner가 해당 owner인지
    //         if (_exists(tokenId) && ownerOf(tokenId) == _owner) {
    //             string memory metadataUri = tokenURI(tokenId);
    //             // list.push(DDToken(tokenId, metadataUri));
    //             list[counter] = DDToken(counter, uri);
    //         }
    //         tokenId++;
    //     }
    //     return list;
    // }
    // (https://ethereum.stackexchange.com/a/112344)
    function getTokensByOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory _tokensOfOwner = new uint256[](balanceOf(_owner));

        for (uint256 i = 0; i < balanceOf(_owner); i++) {
            _tokensOfOwner[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return (_tokensOfOwner);
    }

    // TODO (일단 필요없을 것 같아서 주석처리) 전체 NFT 목록
    // function getAllTokens() public view returns (DDToken[] memory) {
    //     uint256 totalCnt = mintedTokenIds.current();
    //     uint256 counter = 0;

    //     DDToken[] memory res = new DDToken[](totalCnt);
    //     for (uint256 i = 0; i < totalCnt; i++) {
    //         if (_exists(counter)) {
    //             string memory uri = tokenURI(counter);
    //             res[counter] = DDToken(counter, uri);
    //         }
    //         counter++;
    //     }
    //     return res;
    // }

    // 총 minting된 NFT 개수
    // (_tokenIds 를 public하게 선언하면 getter가 자동으로 지원되기 때문에 필요없는 함수이긴 함.)
    // function getTokenCount() {}

    // 커뮤니티 권한 확인
    function isMembership(address owner) public view returns (bool) {
        return balanceOf(owner) > 0;
    }
}
