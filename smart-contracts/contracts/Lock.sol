// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract CharityCrowdfunding {

    // Events
    event CampaignCreated(uint256 campaignId, address organizer, string campaignName, uint256 fundraisingGoal, uint256 donationCap);
    event MilestoneCreated(uint256 campaignId, uint256 milestoneId, string milestoneName, uint256 requiredAmount, uint256 deadline);
    event DonationReceived(uint256 campaignId, address donor, uint256 amount);
    event MilestoneSubmitted(uint256 campaignId, uint256 milestoneId, string ipfsHash);
    event MilestoneVerified(uint256 campaignId, uint256 milestoneId, bool verified);
    event FundsReleased(uint256 campaignId, uint256 milestoneId, address organizer, uint256 amount);
    event FundsRefunded(uint256 campaignId, address donor, uint256 amount);
    // event SendTelegram(string message, address indexed user);
    // event XCMSent(string targetChain, bytes xcmCallData);


    // Structs
    struct Campaign {
        address organizer;
        string campaignName;
        uint256 fundraisingGoal;
        uint256 donationCap;
        uint256 totalRaised;
        uint256 totalReleased;
        uint256[] milestoneIds;
        bool isActive;
    }

    struct Milestone {
        string milestoneName;
        uint256 requiredAmount;
        uint256 deadline;
        string ipfsHash;
        bool isComplete;
    }

    // State variables
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(uint256 => Milestone)) public milestones;
    mapping(uint256 => uint256) public milestoneCount;
    address public owner;
    mapping(address => bool) public verifiers;
    bool private _locked;
    mapping(uint256 => mapping(address => uint256)) public donorDonations;


    // Modifier
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyVerifier(uint256 _campaignId, uint256 _milestoneId) {
        require(verifiers[msg.sender], "Only verifiers can verify milestones");
        require(milestones[_campaignId][_milestoneId].isComplete == false, "Milestone already completed");
        _;
    }

    modifier noReentrant() {
        require(!_locked, "Reentrant call");
        _locked = true;
        _;
        _locked = false;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to create a new campaign
    function createCampaign(string memory _campaignName, uint256 _fundraisingGoal, uint256 _donationCap) public noReentrant {
        campaignCount++;
        campaigns[campaignCount] = Campaign({
            organizer: msg.sender,
            campaignName: _campaignName,
            fundraisingGoal: _fundraisingGoal,
            donationCap: _donationCap,
            totalRaised: 0,
            totalReleased: 0,
            milestoneIds: new uint256[](0),
            isActive: true
        });
        emit CampaignCreated(campaignCount, msg.sender, _campaignName, _fundraisingGoal, _donationCap);
        // emit SendTelegram(string(abi.encodePacked("Campaign Created! ID: ", uint2str(campaignCount), ", Name: ", _campaignName, ", Goal: ", uint2str(_fundraisingGoal), ", Donation Cap: ", uint2str(_donationCap), ", Organizer: ", addressToString(msg.sender))), msg.sender);
    }

    // Function to create a new milestone
    function createMilestone(uint256 _campaignId, string memory _milestoneName, uint256 _requiredAmount, uint256 _deadline) public noReentrant {
        require(msg.sender == campaigns[_campaignId].organizer, "Only organizer can create milestones");
        require(campaigns[_campaignId].isActive, "Campaign is inactive");
        milestoneCount[_campaignId]++;
        uint256 milestoneId = milestoneCount[_campaignId];
        milestones[_campaignId][milestoneId] = Milestone({
            milestoneName: _milestoneName,
            requiredAmount: _requiredAmount,
            deadline: _deadline,
            ipfsHash: "",
            isComplete: false
        });
        campaigns[_campaignId].milestoneIds.push(milestoneId);
        emit MilestoneCreated(_campaignId, milestoneId, _milestoneName, _requiredAmount, _deadline);
        // emit SendTelegram(string(abi.encodePacked("Milestone Created! Campaign ID: ", uint2str(_campaignId), ", Milestone ID: ", uint2str(milestoneId), ", Name: ", _milestoneName, ", Required Amount: ", uint2str(_requiredAmount), ", Deadline: ", uint2str(_deadline))), msg.sender);
    }

    // Function to receive donations
    function donate(uint256 _campaignId) public payable noReentrant {
        require(campaigns[_campaignId].isActive, "Campaign is inactive");
        require(campaigns[_campaignId].totalRaised + msg.value <= campaigns[_campaignId].donationCap, "Donation exceeds cap");
        campaigns[_campaignId].totalRaised += msg.value;
        donorDonations[_campaignId][msg.sender] += msg.value;
        emit DonationReceived(_campaignId, msg.sender, msg.value);
        // emit SendTelegram(string(abi.encodePacked("Donation Received! Campaign ID: ", uint2str(_campaignId), ", Donor: ", addressToString(msg.sender), ", Amount: ", uint2str(msg.value))), msg.sender);
    }

    // Function to submit milestone proof
    function submitMilestoneProof(uint256 _campaignId, uint256 _milestoneId, string memory _ipfsHash) public noReentrant {
        require(msg.sender == campaigns[_campaignId].organizer, "Only organizer can submit proof");
        require(campaigns[_campaignId].isActive, "Campaign is inactive");
        milestones[_campaignId][_milestoneId].ipfsHash = _ipfsHash;
        emit MilestoneSubmitted(_campaignId, _milestoneId, _ipfsHash);
        // emit SendTelegram(string(abi.encodePacked("Milestone Proof Submitted! Campaign ID: ", uint2str(_campaignId), ", Milestone ID: ", uint2str(_milestoneId), ", IPFS Hash: ", _ipfsHash)), msg.sender);
    }

    // Function to verify milestone
    function verifyMilestone(uint256 _campaignId, uint256 _milestoneId, bool _verified) public onlyVerifier(_campaignId, _milestoneId) noReentrant {
        milestones[_campaignId][_milestoneId].isComplete = _verified;
        emit MilestoneVerified(_campaignId, _milestoneId, _verified);
        // emit SendTelegram(string(abi.encodePacked("Milestone Verified! Campaign ID: ", uint2str(_campaignId), ", Milestone ID: ", uint2str(_milestoneId), ", Verified: ", _verified ? "true" : "false")), msg.sender);
    }

    // Function to release funds
    function releaseFunds(uint256 _campaignId, uint256 _milestoneId) public noReentrant {
        require(msg.sender == campaigns[_campaignId].organizer, "Only organizer can release funds");
        require(milestones[_campaignId][_milestoneId].isComplete, "Milestone is not complete");
        require(block.timestamp <= milestones[_campaignId][_milestoneId].deadline, "Milestone deadline has passed");
        uint256 amountToRelease = milestones[_campaignId][_milestoneId].requiredAmount;
        require(campaigns[_campaignId].totalRaised >= amountToRelease, "Not enough funds raised");
        campaigns[_campaignId].totalRaised -= amountToRelease;
        campaigns[_campaignId].totalReleased += amountToRelease;
        payable(campaigns[_campaignId].organizer).transfer(amountToRelease);
        emit FundsReleased(_campaignId, _milestoneId, campaigns[_campaignId].organizer, amountToRelease);
        // emit SendTelegram(string(abi.encodePacked("Funds Released! Campaign ID: ", uint2str(_campaignId), ", Milestone ID: ", uint2str(_milestoneId), ", Amount: ", uint2str(amountToRelease), ", Organizer: ", addressToString(campaigns[_campaignId].organizer))), msg.sender);
    }

    // Function to claim refund for individual donors
    function claimRefund(uint256 _campaignId) public noReentrant {
        require(!campaigns[_campaignId].isActive, "Campaign is active");
        uint256 amountToRefund = donorDonations[_campaignId][msg.sender];
        require(amountToRefund > 0, "No donation to refund");
        donorDonations[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(amountToRefund);
        emit FundsRefunded(_campaignId, msg.sender, amountToRefund);
        // emit SendTelegram(string(abi.encodePacked("Refund Claimed! Campaign ID: ", uint2str(_campaignId), ", Donor: ", addressToString(msg.sender), ", Amount: ", uint2str(amountToRefund))), msg.sender);
    }

    // Function to assign verifier role
    function assignVerifier(address _verifier) public onlyOwner noReentrant {
        verifiers[_verifier] = true;
    }

    // Function to remove verifier role
    function removeVerifier(address _verifier) public onlyOwner noReentrant {
        verifiers[_verifier] = false;
    }

    // Function to get campaign details
    function getCampaignDetails(uint256 _campaignId) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }

    // Function to get milestone details
    function getMilestoneDetails(uint256 _campaignId, uint256 _milestoneId) public view returns (Milestone memory) {
        return milestones[_campaignId][_milestoneId];
    }


    // function executeWorkflow(string memory message) public {
    //     emit SendTelegram(message, msg.sender);
    // }


    // function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    //     if (_i == 0) {
    //         return "0";
    //     }
    //     uint j = _i;
    //     uint len;
    //     while (j != 0) {
    //         len++;
    //         j /= 10;
    //     }
    //     bytes memory bstr = new bytes(len);
    //     uint k = len;
    //     while (_i != 0) {
    //         k = k-1;
    //         uint8 temp = (48 + uint8(_i - _i / 10 * 10));
    //         bytes1 b1 = bytes1(temp);
    //         bstr[k] = b1;
    //         _i /= 10;
    //     }
    //     return string(bstr);
    // }

    // function addressToString(address _addr) internal pure returns (string memory) {
    //     bytes32 value = bytes32(uint256(uint160(_addr)));
    //     bytes memory alphabet = "0123456789abcdef";
    //     bytes memory str = new bytes(42);
    //     str[0] = '0';
    //     str[1] = 'x';
    //     for (uint256 i = 0; i < 20; i++) {
    //         str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
    //         str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
    //     }
    //     return string(str);
    // }
}