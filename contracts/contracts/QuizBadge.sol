// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizBadge is ERC1155, Ownable {
    mapping(address => bool) public hasMinted;

    constructor(string memory _uri) ERC1155(_uri) Ownable(msg.sender) {}

    // id: 1 = Crypto Curious, 2 = DeFi Teen, 3 = On-Chain Adult
    function mintBadge(uint256 id) external {
        require(!hasMinted[msg.sender], "You already minted a badge");
        require(id >= 1 && id <= 3, "Invalid badge id");

        hasMinted[msg.sender] = true;
        _mint(msg.sender, id, 1, "");
    }
}
