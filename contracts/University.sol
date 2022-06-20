// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract University {

    struct Degree {
        uint date;
        string name;
        string surname;
        string degreeDate;
    }

    struct Moderator {
        uint index;
        string name;
        string surname;
        bool exist;
    }

    mapping(bytes32 => Degree) private degrees;
    mapping(address => Moderator) private moderators;
    address public university; 

    event DegreeAdded(bytes32 indexed _hash, address indexed _by);
    event ModeratorAdded(address _address);
    event ModeratorRemoved(address _address);

    constructor(){
        university = msg.sender; 
    }

    modifier onlyOwner() {
        require(msg.sender == university, "This function is only available to the\"owner\" address of this contract.");
        _;
    }
    modifier onlyMod() {
        require(isModarator(msg.sender), "This function is only available to Moderator addresses.");
        _;
    }

    function returnOwner() public view returns(address) {
        return university;
    }

    function addNewDegree(bytes32 _sha26PDF, string memory _name, string memory _surname, string memory _date) onlyOwner public {

        require(bytes(_name).length < 256, "Provided name is of unrealistic length.");
        //require(bytes(_name).length > 0, "A name was not provided.");
        require(bytes(_surname).length < 256, "Provided name is of unrealistic length.");
        //require(bytes(_surname).length > 0, "A name was not provided.");
        require(bytes(_date).length < 256, "Provided date is of unrealistic length.");
        require(degrees[_sha26PDF].date == 0, "This degree is already validated.");

        Degree storage degree = degrees[_sha26PDF];
        degree.date = block.timestamp;
        degree.name = _name;
        degree.surname = _surname;
        degree.degreeDate = _date;

        emit DegreeAdded(_sha26PDF, msg.sender);
    }

    function getDegree(bytes32 _sha26PDF) public view returns(bytes32, uint, string memory, string memory, string memory ) {
        require(degrees[_sha26PDF].date != 0, "There is no degree that match a specific university student!");
        return (_sha26PDF, degrees[_sha26PDF].date, degrees[_sha26PDF].name, degrees[_sha26PDF].surname, degrees[_sha26PDF].degreeDate);
    }

    function addModerator(address _addressModerator, string memory _name, string memory _surname) onlyOwner public {
        require(_addressModerator != address(0x0), "Please provide a valid Ethereum address!");
        require(bytes(_name).length > 0, "Specify moderator's name.");
        require(bytes(_surname).length > 0, "Specify moderator's name.");
        require(!isModarator(_addressModerator), "This user is already a moderator!");

        Moderator storage moderator = moderators[_addressModerator];
        moderator.index += 1;
        moderator.name = _name;
        moderator.surname = _surname;
        moderator.exist = true;

        emit ModeratorAdded(_addressModerator);
    }

    function removeModerator(address _addressModerator) onlyOwner public {

        require(isModarator(_addressModerator), "The provided address does not belong to a moderator.");

        delete moderators[_addressModerator];

        emit ModeratorRemoved(_addressModerator);
    }

    function isModarator(address _addressModerator) public view returns(bool) {
        if(moderators[_addressModerator].exist == true) {
            return true;
        } else {
            return false;
        }
    }
}