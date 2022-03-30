// SPDX-License-Identifier: MIT
pragma solidity >0.4.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// import "../access/Ownable.sol";
// import "../utils/SafeMath.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;
    string public name; // 글 제목
    string public url; // 모금 주소
    string public imageURL; // 사진 주소
    string public description; // 사연
    uint256 public donationsGoal; // 목표 금액
    uint256 public fundRaisingCloses; // 마감 기한
    address payable public beneficiary; // 수혜자 주소
    address public custodian;
    struct Donation {
        uint256 value;
        uint256 date;
    }
    mapping(address => Donation[]) private _donations;
    uint256 public totalDonations; // 현재 기부 금액
    uint256 public donationsCount; // 현재 기부한 사람 인원

    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    constructor(
        string memory _name,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        uint256 _donationsGoal,
        uint256 _fundRaisingCloses,
        address payable _beneficiary,
        address _custodian
    ) {
        name = _name;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        donationsGoal = _donationsGoal;
        fundRaisingCloses = _fundRaisingCloses;
        beneficiary = _beneficiary;
        transferOwnership(_custodian);
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    function donate(uint256 amount) public {
        // require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
        Donation memory donation = Donation({
            value: amount,
            date: block.timestamp
        });
        _donations[msg.sender].push(donation);
        totalDonations = totalDonations.add(amount);
        donationsCount++;
        emit DonationReceived(msg.sender, amount);
    }

    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }
        return (values, dates);
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        payable(beneficiary).transfer(balance);
        emit Withdraw(balance);
    }

    // fallback() external payable {
    //     totalDonations = totalDonations.add(msg.value);
    //     donationsCount++;
    // }
}
