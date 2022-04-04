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
        address account;
        uint256 date;
        uint256 value;
        string donationTitle;
        string donationUrl;
    }
    Donation[] public _donations;
    Donation public withdrawData; // 수령 data
    mapping (address => Donation[]) public _myDonations;
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

    function myDonationsCount (address _sender) public payable returns (uint256) {
        return _myDonations[_sender].length;
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function nowAddress() public payable returns(address) { // 현재 컨트랙트 주소
        return msg.sender;
    }

    function donate(uint256 _amount) public payable {
        // require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
        address sender = msg.sender;

        // 기부한 금액과 시간과 사람
        Donation memory donation = Donation({
            account: sender,
            date: block.timestamp,
            value: _amount,
            donationTitle: title,
            donationUrl: url
        });
        _donations.push(donation);
        _myDonations[sender].push(Donation(sender,block.timestamp,_amount,title,url));

        donationsCount++;
        require (erc20Contract.approve(address(this),_amount),"address fail");
        require (erc20Contract.approve(msg.sender,_amount),"msg.sender fail");

        erc20Contract.transferFrom(msg.sender, address(this), _amount); // 후견인 -> 컨트랙트로 송금
        emit DonationReceived(msg.sender, _amount);
    }

    // 현재 컨트랙트에 내가 기부한 내역
    function myDonations (address _myAccount) public payable returns (Donation[] memory donationlist) {
        uint256 count = myDonationsCount(_myAccount);
        donationlist = new Donation[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _myDonations[_myAccount][i];
            donationlist[i] = donation;
        }
        return donationlist;
    }

    // 현재 컨트랙트의 모든 기부내역
    function getDonations()
        public
        view
        returns (Donation[] memory donationlist)
    {
        uint256 count = donationsCount;
        donationlist = new Donation[](count);
        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[i];
            donationlist[i] = donation;
        }
        return donationlist;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = erc20Contract.balanceOf(address(this)); // 현재 컨트랙트의 금액

        require (erc20Contract.approve(address(this),balance),"address fail");
        require (erc20Contract.approve(msg.sender,balance),"msg.sender fail");
        require (balance > 0 ,"contract have no money");

        erc20Contract.transfer(beneficiary, balance); // 현재 컨트랙트의 금액을 beneficiary에게 송금처리한다.

        withdrawData = Donation({
            value: balance,
            date: block.timestamp,
            account: msg.sender
        });

        emit Withdraw(balance);
    }

}
