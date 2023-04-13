//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

 contract modificador{
    address admin;
    uint256 edad;
    constructor(){
        admin = msg.sender;

    }
    modifier OnlyOwner{
        require(admin == msg.sender, "No eres Admin");
        _;
    }
    function GetNumber(uint256 _edad) external OnlyOwner{
        edad = _edad;

    }

 }

