//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Calculadora{
    function suma(uint a, uint b) public pure returns(uint){
        return a+b;
    }
    function resta(uint a, uint b) public pure returns(uint){
        return a-b;
    }
    function mult(uint a, uint b) public pure returns(uint){
        return a*b;
    }
    function divis(uint a, uint b) public pure returns(uint){
        return a/b;
    }


}