pragma solidity ^0.5.0;

contract Auth {

    mapping (address => bool) private set;

    mapping (address => uint) public token;

    event SetTokenEvent();

    uint private num = 1234567;

    constructor () public {   
    }

    function setToken() public {
        require(!set[msg.sender], "user already authenticated");
        set[msg.sender] = true;
        num = num + uint(keccak256(abi.encodePacked(block.difficulty, now, msg.sender)));
        token[msg.sender] = num;
        emit SetTokenEvent();
    }

    

}