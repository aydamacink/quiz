// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizBadge is ERC1155, Ownable {
    uint256 public constant QUIZ_BADGE_ID = 1;

    mapping(address => bool) public hasMinted;

    constructor(string memory _uri) ERC1155(_uri) Ownable(msg.sender) {}

    function mintBadge() external {
        require(!hasMinted[msg.sender], "You already have the badge");
        hasMinted[msg.sender] = true;

        _mint(msg.sender, QUIZ_BADGE_ID, 1, "");
    }
}
