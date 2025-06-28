// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Interface for the Campaign contract
interface ICampaign {
    function contribute() external payable;
    function createRequest(string calldata description, uint256 value, address recipient) external;
    function approveRequest(uint256 requestId) external;
    function finalizeRequest(uint256 requestId) external;
    function getSummary() external view returns (string memory, string memory, uint256, uint256, uint256, address, uint256);
    function getRequestsCount() external view returns (uint);
    function getRequest(uint index) external view returns (string memory, uint, address, bool, uint);
}

/**
 * @title Campaign
 * @author Gemini
 * @notice This contract manages a single charity campaign. It handles donations
 * and a decentralized spending approval process.
 */
contract Campaign {
    // A request for spending funds, which must be approved by donors.
    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    // State Variables
    address public manager;
    string public title;
    string public description;
    uint256 public targetAmount;
    uint256 public deadline;
    uint256 public amountRaised;
    uint256 public approversCount; // Number of donors

    mapping(address => bool) public approvers; // To track who has donated
    Request[] public requests;

    // Events
    event Contribution(address indexed contributor, uint256 amount);
    event RequestCreated(uint256 indexed requestId, string description, uint256 value, address indexed recipient);
    event RequestApproved(uint256 indexed requestId, address indexed approver);
    event RequestFinalized(uint256 indexed requestId, bool successful);

    // Modifiers
    modifier onlyManager() {
        require(msg.sender == manager, "Only the campaign manager can perform this action.");
        _;
    }

    modifier onlyApprover() {
        require(approvers[msg.sender], "You must be a donor to approve requests.");
        _;
    }

    /**
     * @dev Constructor to initialize a new campaign.
     * @param _manager The address of the person creating the campaign.
     * @param _title The title of the campaign.
     * @param _description A detailed description of the campaign.
     * @param _target The funding goal in wei.
     * @param _deadline The timestamp until which donations are accepted.
     */
    constructor(address _manager, string memory _title, string memory _description, uint256 _target, uint256 _deadline) {
        manager = _manager;
        title = _title;
        description = _description;
        targetAmount = _target;
        deadline = _deadline;
    }

    /**
     * @notice Allows anyone to contribute to the campaign.
     * @dev The function is payable, meaning it can receive Ether.
     */
    function contribute() external payable {
        require(block.timestamp < deadline, "Campaign has ended.");
        require(msg.value > 0, "Contribution must be greater than zero.");

        // If the contributor is donating for the first time, increment the approvers count.
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }

        amountRaised += msg.value;
        emit Contribution(msg.sender, msg.value);
    }

    /**
     * @notice Allows the manager to create a spending request.
     * @param _description Describes the purpose of the spending.
     * @param _value The amount of Ether to be spent.
     * @param _recipient The address that will receive the funds.
     */
    function createRequest(string calldata _description, uint256 _value, address _recipient) external onlyManager {
        require(_value <= address(this).balance, "Request value exceeds contract balance.");
        
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = payable(_recipient);
        newRequest.complete = false;
        newRequest.approvalCount = 0;

        emit RequestCreated(requests.length - 1, _description, _value, _recipient);
    }

    /**
     * @notice Allows donors (approvers) to vote on a spending request.
     * @param requestId The ID of the request to approve.
     */
    function approveRequest(uint256 requestId) external onlyApprover {
        Request storage request = requests[requestId];

        require(!request.complete, "Request is already completed.");
        require(!request.approvals[msg.sender], "You have already approved this request.");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
        emit RequestApproved(requestId, msg.sender);
    }

    /**
     * @notice Allows the manager to finalize a request after it has sufficient approvals.
     * @dev Transfers funds to the recipient if more than 50% of donors have approved.
     * @param requestId The ID of the request to finalize.
     */
    function finalizeRequest(uint256 requestId) external onlyManager {
        Request storage request = requests[requestId];

        require(!request.complete, "Request is already completed.");
        // Require more than 50% of donors to approve.
        require(request.approvalCount > (approversCount / 2), "Request does not have enough approvals.");
        require(address(this).balance >= request.value, "Insufficient funds to finalize this request.");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
        emit RequestFinalized(requestId, true);
    }

    /**
     * @notice Returns a summary of the campaign's details.
     */
    function getSummary() public view returns (
        string memory, string memory, uint256, uint256, uint256, address, uint256
    ) {
        return (
            title,
            description,
            targetAmount,
            deadline,
            amountRaised,
            manager,
            requests.length
        );
    }
    
    /**
     * @notice Returns the total number of spending requests.
     */
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

    /**
     * @notice Returns details for a specific request.
     * @param index The index of the request in the requests array.
     */
    function getRequest(uint index) public view returns (string memory, uint, address, bool, uint) {
        Request storage r = requests[index];
        return (r.description, r.value, r.recipient, r.complete, r.approvalCount);
    }
}


/**
 * @title CampaignFactory
 * @author Gemini
 * @notice A factory contract to create and manage multiple charity campaigns.
 */
contract CampaignFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(
        address indexed campaignAddress,
        address indexed manager,
        string title,
        uint256 target,
        uint256 deadline
    );

    /**
     * @notice Deploys a new Campaign contract and stores its address.
     * @param title The title for the new campaign.
     * @param description A detailed description for the new campaign.
     * @param targetAmount The funding goal in wei.
     * @param deadline The timestamp for the campaign deadline.
     */
    function createCampaign(string memory title, string memory description, uint256 targetAmount, uint256 deadline) public {
        // We set targetAmount > 0 to prevent creating campaigns with no goal.
        require(targetAmount > 0, "Target amount must be greater than 0");
        // We set deadline in the future to ensure campaign is not created already expired
        require(deadline > block.timestamp, "Deadline must be in the future");

        Campaign newCampaign = new Campaign(msg.sender, title, description, targetAmount, deadline);
        deployedCampaigns.push(address(newCampaign));

        emit CampaignCreated(address(newCampaign), msg.sender, title, targetAmount, deadline);
    }

    /**
     * @notice Returns an array of addresses for all deployed campaigns.
     */
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
