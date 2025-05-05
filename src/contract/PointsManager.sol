
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title PointsManager
 * @dev Smart contract for managing points in the dklabs.io platform
 */
contract PointsManager {
    address public owner;
    mapping(address => uint256) public points;
    mapping(address => bool) public authorizedUpdaters;

    // Events
    event PointsAdded(address indexed user, uint256 amount);
    event PointsSet(address indexed user, uint256 amount);
    event UpdaterAdded(address indexed updater);
    event UpdaterRemoved(address indexed updater);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Owner only");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || authorizedUpdaters[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Add an authorized updater address
     * @param _updater The address to authorize
     */
    function addUpdater(address _updater) external onlyOwner {
        authorizedUpdaters[_updater] = true;
        emit UpdaterAdded(_updater);
    }

    /**
     * @dev Remove an authorized updater address
     * @param _updater The address to unauthorized
     */
    function removeUpdater(address _updater) external onlyOwner {
        authorizedUpdaters[_updater] = false;
        emit UpdaterRemoved(_updater);
    }

    /**
     * @dev Add points to a user's balance
     * @param _user The user's address
     * @param _amount The amount of points to add
     */
    function addPoints(address _user, uint256 _amount) external onlyAuthorized {
        points[_user] += _amount;
        emit PointsAdded(_user, _amount);
    }

    /**
     * @dev Set a user's points to a specific value
     * @param _user The user's address
     * @param _amount The amount of points to set
     */
    function setPoints(address _user, uint256 _amount) external onlyAuthorized {
        points[_user] = _amount;
        emit PointsSet(_user, _amount);
    }

    /**
     * @dev Get a user's points balance
     * @param _user The user's address
     * @return The user's points balance
     */
    function getPoints(address _user) external view returns (uint256) {
        return points[_user];
    }

    /**
     * @dev Transfer ownership of the contract
     * @param _newOwner The address of the new owner
     */
    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "Invalid address");
        owner = _newOwner;
    }

    // The following functions would be implemented when integrating with Chainlink:
    
    /**
     * @dev This function would be called by a Chainlink oracle to update points
     * from off-chain computation time data
     * @param _user The user's address
     * @param _computeTimeSeconds The seconds of compute time to reward
     */
    function updatePointsFromOracle(address _user, uint256 _computeTimeSeconds) external onlyAuthorized {
        // In a production environment, this would verify the oracle's signature
        // and ensure the data is recent
        points[_user] += _computeTimeSeconds; // 1 point per second of compute time
        emit PointsAdded(_user, _computeTimeSeconds);
    }
}
