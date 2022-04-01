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

    // get token
    // function getToken(uint256 tokenId) external view returns (DDToken memory) {
    //     DDToken memory token = DDToken(tokenId, ddTokens[tokenId]);
    //     return token;
    // }

    // // get metadata uri ("ipfs://"로 시작하는)
    // function getMetadataUri(uint256 tokenId)
    //     external
    //     view
    //     returns (string memory)
    // {
    //     return ddTokens[tokenId];
    // }

    // NFT 잔여 수량을 위해 mint가 된 token 개수 반환
    function getMintedTokenCount() external view returns (uint256) {
        return
            covidTokenIds.current() +
            singleTokenIds.current() +
            warriorTokenIds.current() +
            patientTokenIds.current();
    }
}
