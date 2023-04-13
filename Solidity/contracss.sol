pragma solidity ^0.4.24;

contract Mycontract {

    string value;

    constructor() public {

        value = "Hello world";
    }
    function get() public view returns(string){
        return value;

    }

    function set(string _value) public{
        value = _value;

    } 


}

