// SPDX-License-Identifier: MIT
pragma solidity >0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;
    string public title; // 글 제목
    string public id; // 모금 donationId
    string public imageURL; // 사진 주소
    string public description; // 사연
    uint256 public donationsGoal; // 목표 금액
    uint256 public fundRaisingCloses; // 마감 기한
    address payable public beneficiary; // 수혜자 주소
    address public custodian; // 후견인 주소
    IERC20 public erc20Contract; // ssafyContract를 가져오기위한 토큰 컨트랙트 인터페이스
    bool public isWithdraw; // 기부 수령 확인
    uint256 public donationCollectMoney;

    struct Donation {
        address fromAccount;
        address toAccount;
        uint256 date;
        uint256 value;
        string donationTitle;
        string donationId;
    }
    Donation[] public _donations;
    Donation public withdrawData; // 수령 data
    mapping(address => Donation[]) public _myDonations;
    uint256 public donationsCount; // 현재 기부한 사람 인원
    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    constructor(
        string memory _title,
        string memory _id,
        string memory _imageURL,
        string memory _description,
        uint256 _donationsGoal,
        uint256 _fundRaisingCloses,
        address payable _beneficiary,
        address _custodian
    ) {
        title = _title;
        id = _id;
        imageURL = _imageURL;
        description = _description;
        donationsGoal = _donationsGoal;
        fundRaisingCloses = _fundRaisingCloses;
        beneficiary = _beneficiary;
        transferOwnership(_beneficiary);
        erc20Contract = IERC20(
            address('이요할 토큰 컨트랙트 Address')
        ); // ssafycontract 주소 주입
        isWithdraw = false;
        donationCollectMoney = 0;
    }

    function myDonationsCount(address _sender)
        public
        payable
        returns (uint256)
    {
        return _myDonations[_sender].length;
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function donate(uint256 _amount) public payable {
        // require(block.timestamp < fundRaisingCloses, "FUND RAISING CLOSED");
        address sender = msg.sender;

        // 기부한 금액과 시간과 사람
        Donation memory donation = Donation({
            fromAccount: sender,
            toAccount: address(this),
            date: block.timestamp,
            value: _amount,
            donationTitle: title,
            donationId: id
        });
        _donations.push(donation);
        _myDonations[sender].push(
            Donation(sender, address(this), block.timestamp, _amount, title, id)
        );
        donationCollectMoney += _amount;
        donationsCount++;
        require(erc20Contract.approve(address(this), _amount), "address fail");
        require(erc20Contract.approve(sender, _amount), "msg.sender fail");

        erc20Contract.transferFrom(sender, address(this), _amount); // 후견인 -> 컨트랙트로 송금
        emit DonationReceived(sender, _amount);
    }

    // 현재 컨트랙트에 내가 기부한 내역
    function myDonations(address _myAccount)
        public
        payable
        returns (Donation[] memory donationlist)
    {
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

    function withdraw() public payable {
        uint256 balance = erc20Contract.balanceOf(address(this)); // 현재 컨트랙트의 금액
        address sender = msg.sender;
        isWithdraw = true;
        require(erc20Contract.approve(address(this), balance), "address fail");
        require(erc20Contract.approve(sender, balance), "msg.sender fail");
        require(balance > 0, "contract have no money");

        withdrawData = Donation({
            fromAccount: sender,
            toAccount: address(this),
            date: block.timestamp,
            value: balance,
            donationTitle: title,
            donationId: id
        });

        erc20Contract.transfer(beneficiary, balance); // 현재 컨트랙트의 금액을 beneficiary에게 송금처리한다.

        emit Withdraw(balance);
    }
}
