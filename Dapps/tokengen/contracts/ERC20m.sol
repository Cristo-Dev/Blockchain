// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// TokenGen is just a Token platform creator
// TokenGen is not the owner of this token
import "./Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20m is ERC20, Ownable {
    using Address for address; //Aumentar la seguridad
    using SafeMath for uint256;
    using SafeMath for uint8;
    using SafeMath for uint;

    uint8 private __decimals;
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address owner,
        uint8 _decimals
    ) ERC20 (name, symbol) { // constructor estandar del erc20
          __decimals = _decimals;
        _mint(owner, supply * __decimals);
        transferOwnership(owner);
    }

    function decimals() public view override returns(uint8){
        return __decimals;
    }

    function burn(uint256 amount) public {
        _burn(_msgSender(), amount);
    }
    function mint(uint256 amount) public onlyOwner {
        _mint(_msgSender(), amount);
    }
}