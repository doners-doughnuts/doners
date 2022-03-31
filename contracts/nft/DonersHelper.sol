// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DonersOwnership.sol";

contract DonersHelper is DonersOwnership {
    using Counters for Counters.Counter;

    // function getZombiesByOwner(address _owner)
    //     external
    //     view
    //     returns (uint256[] memory)
    // {
    //     uint256[] memory result = new uint256[](ownerZombieCount[_owner]);
    //     uint256 counter = 0;
    //     for (uint256 i = 0; i < zombies.length; i++) {
    //         if (zombieToOwner[i] == _owner) {
    //             result[counter] = i;
    //             counter++;
    //         }
    //     }
    //     return result;
    // }

    // 임시 테스팅 (Factory에서 생성된 NFT들이 잘 들어갔는지 확인하는 용도.)
    function test() external view returns (uint256) {
        return tokenIds.current();
    }

    // get token
    function getToken(uint256 tokenId) external view returns (DDToken) {
        return _ddTokens[tokenId];
    }

    // get metadata uri ("ipfs://"로 시작하는)
    function getMetadataUri(uint256 tokenId) external view returns (string) {
        return _ddTokens[tokenId].metadataUri;
    }

    // NFT 잔여 수량
}
