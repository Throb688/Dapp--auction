// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "http://47.99.87.207:8080/token/ERC20/ERC20.sol";
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/ERC20.sol";

contract Desc20 is ERC20 {
    constructor(string memory name,string memory symbol) ERC20(name,symbol ){
        _mint(msg.sender, 100 * 10**uint(decimals()));
        
    }
}