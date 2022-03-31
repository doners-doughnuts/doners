// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;
    string public title; // 글 제목
    string public url; // 모금 주소
    string public imageURL; // 사진 주소
    string public description; // 사연
    uint256 public donationsGoal; // 목표 금액
    uint256 public nowCollectMoney; // 현재 금액
    uint256 public fundRaisingCloses; // 마감 기한
    address payable public beneficiary; // 수혜자 주소
    address public custodian;
    IERC20 public erc20Contract;

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
        string memory _title,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        uint256 _donationsGoal,
        uint256 _nowCollectMoney,
        uint256 _fundRaisingCloses,
        address payable _beneficiary,
        address _custodian
    ) {
        title = _title;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        donationsGoal = _donationsGoal;
        nowCollectMoney =_nowCollectMoney;
        fundRaisingCloses = _fundRaisingCloses;
        beneficiary = _beneficiary;
        transferOwnership(_custodian);
        erc20Contract = IERC20(address(0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333));
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function myDonationsCount() public view returns (uint256) { // 내 기부 갯수
        return _donations[msg.sender].length;
    }

    function nowAddress() public returns(address) { // 현재 컨트랙트 주소
        return address(this);
    }

    function donate(uint256 _amount) public payable {
        // require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
        // Donation memory donation = Donation({
        //     value: _amount,
        //     date: block.timestamp
        // });
        // _donations[msg.sender].push(donation);
        // totalDonations = totalDonations.add(_amount);
        // donationsCount++;

        require (erc20Contract.approve(address(this),_amount),"address fail");
        require (erc20Contract.approve(msg.sender,_amount),"msg.sender fail");

        nowCollectMoney += _amount;
        erc20Contract.transferFrom(msg.sender, address(this), _amount);
        emit DonationReceived(msg.sender, _amount);
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

        require (erc20Contract.approve(address(this),nowCollectMoney),"address fail");
        require (erc20Contract.approve(msg.sender,nowCollectMoney),"msg.sender fail");

        erc20Contract.transfer(beneficiary, nowCollectMoney); // 현재 컨트랙트의 금액을 beneficiary에게 송금처리한다.
        nowCollectMoney = 0;
        emit Withdraw(balance);
    }

}
