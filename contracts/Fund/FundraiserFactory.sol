// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
    address[] private _fundraisers; // 생성된 fundraiser contract 주소 배열

    event FundraiserCreated(
        address indexed fundraiser,
        address indexed owner
    );

    // fundraiser contract 배열 길이
    function fundraisersCount() public view returns (uint256) {
        return _fundraisers.length;
    }

    function createFundraiser(
        string memory title,
        string memory id,
        string memory imageURL,
        string memory description,
        uint256 donationsGoal,
        uint256 fundRaisingCloses,
        address payable beneficiary
    ) public returns (address){
        Fundraiser fundraiser = new Fundraiser(
            title,
            id,
            imageURL,
            description,
            donationsGoal,
            fundRaisingCloses,
            beneficiary,
            msg.sender
        );
        // fundraiser 컨트랙트 배열에 추가
        _fundraisers.push(address(fundraiser));

        // 모금 컨트랙트 이벤트 발생
        emit FundraiserCreated(address(fundraiser), msg.sender);

        return address(fundraiser);
    }

    // fundraiser contract 배열
    function getFundraisers()
        public
        view
        returns (address[] memory coll)
    {
        uint256 size = fundraisersCount();
        coll = new address[](size);

        for (uint256 i = 0; i < size; i++) {
            coll[i] = _fundraisers[i];
        }

        return coll;
    }
}
