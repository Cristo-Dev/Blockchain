//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HolaMundo{
    string private User;

    function TakeUser(string memory _User) public{
        User = _User;

    }

    function CallUser() public view returns(string memory){
        string memory saludo1 = "Hola";
        string memory saludo2 = ", bienvenido a mis apuntes de solidity";
        //string memory saludo = string(abi.encodePacked(saludo1, usuario, saludo2));
        string memory saludo = string.concat(saludo1, usuario, saludo2);
        return saludo;


    }

}