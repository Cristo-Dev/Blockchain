// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CristoDappToken is ERC20{
    constructor() ERC20("CristoDapp token","CDT"){ //Creamos token con ese nombre y simbolo
    _mint(msg.sender,10000000*10**18); //1M de suplay con 18 decimales

    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }
}


