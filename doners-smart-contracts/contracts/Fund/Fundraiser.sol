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
    uint256 public fundRaisingCloses; // 마감 기한
    address payable public beneficiary; // 수혜자 주소
    address public custodian; // 후견인 주소
    IERC20 public erc20Contract; // ssafyContract를 가져오기위한 토큰 컨트랙트 인터페이스

    struct Donation {
        uint256 value;
        uint256 date;
        address account;
    }
    Donation[] public _donations;
    uint256 public donationsCount; // 현재 기부한 사람 인원

    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    constructor(
        string memory _title,
        string memory _url,
        string memory _imageURL,
        string memory _description,
        uint256 _donationsGoal,
        uint256 _fundRaisingCloses,
        address payable _beneficiary,
        address _custodian
    ) {
        title = _title;
        url = _url;
        imageURL = _imageURL;
        description = _description;
        donationsGoal = _donationsGoal;
        fundRaisingCloses = _fundRaisingCloses;
        beneficiary = _beneficiary;
        transferOwnership(_custodian);
        erc20Contract = IERC20(address(0x6C927304104cdaa5a8b3691E0ADE8a3ded41a333)); // ssafycontract 주소 주입
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function nowAddress() public returns(address) { // 현재 컨트랙트 주소
        return address(this);
    }

    function donate(uint256 _amount) public payable {
        // require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");

        // 기부한 금액과 시간과 사람
        Donation memory donation = Donation({
            value: _amount,
            date: block.timestamp,
            account: msg.sender
        });
        _donations.push(donation);
        donationsCount++;
        require (erc20Contract.approve(address(this),_amount),"address fail");
        require (erc20Contract.approve(msg.sender,_amount),"msg.sender fail");

        erc20Contract.transferFrom(msg.sender, address(this), _amount); // 후견인 -> 컨트랙트로 송금
        emit DonationReceived(msg.sender, _amount);
    }

    function getDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates,address[] memory accounts)
    {
        uint256 count = donationsCount;
        values = new uint256[](count);
        dates = new uint256[](count);
        accounts = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[i];
            values[i] = donation.value; // 금액
            dates[i] = donation.date; // 시간
            accounts[i] = donation.account; // 지갑주소
        }
        return (values, dates,accounts);
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = erc20Contract.balanceOf(address(this)); // 현재 컨트랙트의 금액

        require (erc20Contract.approve(address(this),balance),"address fail");
        require (erc20Contract.approve(msg.sender,balance),"msg.sender fail");
        require (balance > 0 ,"contract have no money");

        erc20Contract.transfer(beneficiary, balance); // 현재 컨트랙트의 금액을 beneficiary에게 송금처리한다.
        emit Withdraw(balance);
    }

}
