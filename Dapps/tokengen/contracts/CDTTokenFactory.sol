// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Address.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Tokens types
// 1 = Standard, 2 = Burnable, 3 = Mintable
import "./ERC20f.sol";
import "./ERC20s.sol";
import "./ERC20b.sol";
import "./ERC20m.sol";

contract CDTTokenFactory is Ownable{

    using Address for address;
    using SafeMath for uint256;
    using SafeMath for uint8;
    using SafeMath for uint;

    IERC20Metadata private cdt;
    uint256 private deployPriceBNB = 100000000000000000; // 0.1 BNB
    uint256 private deployPriceCDT = 556799999999999930000; // 557 CDT (-20%) => 0.08 BNB

    constructor(address _cdt){
         cdt = IERC20Metadata(_cdt);
    }

    function deploydf(
        string memory name,
        string memory symbol,
        uint256 supply
    ) external returns(address){
        return address(new ERC20f(
            name,
            symbol,
            supply,
            _msgSender()
        ));
    }

    function _deploy(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 supply,
        uint tokenType
    ) private returns(address){
        if(tokenType == 1)
            return address(
                new ERC20Ss(name, symbol, decimals, supply, _msgSender()));

        if(tokenType == 2)
            return address(
                new ERC20b(name, symbol, decimals, supply, _msgSender()));

        if(tokenType == 3)
            return address(
                new ERC20m(name, symbol, decimals, supply, _msgSender()));

        return address(0);
    }

     function deployPaidBNB(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 supply,
        uint tokenType
    ) external payable returns(address){
        require(msg.value == deployPriceBNB);

        return _deploy(name, symbol, decimals, supply, tokenType);
    }

    function deployPaidCDT(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 supply,
        uint tokenType
    ) external returns(address){
        require(mda.balanceOf(_msgSender()) >= deployPriceCDT);
        require(mda.allowance(_msgSender(), address(this)) >= deployPriceCDT);
        require(mda.transferFrom(_msgSender(), address(this), deployPriceCDT));

        return _deploy(name, symbol, decimals, supply, tokenType);
    }

    function getDeployPriceCDT() external view returns(uint256){
        return deployPriceCDT;
    }

    function getDeployPriceBNB() external view returns(uint256){
        return deployPriceBNB;
    }

    function getPaidTokenAddress() external view returns(address){
        return address(cdt);
    }

    function getPaidTokenDecimals() external view returns(uint8){
        return cdt.decimals();
    }

    function updateDeployPriceMDA(uint256 NewPrice) external onlyOwner {
        deployPriceMDA = NewPrice;
    }

    function updateDeployPriceBNB(uint256 NewPrice) external onlyOwner {
        deployPriceBNB = NewPrice;
    }

    function withdrawBNB(address payable account) external onlyOwner {
        (bool success, ) = account.call{value: address(this).balance}("");
        require(success);
    }

    function withdrawToken(address account, uint256 amount) external onlyOwner {
        require(cdt.transfer(account, amount));
    }

    function withdrawTokenAll(address account) external onlyOwner {
        require(cdt.transfer(account, cdt.balanceOf(address(this))));
    }

    receive() external payable {}
    fallback() external payable {}
}

