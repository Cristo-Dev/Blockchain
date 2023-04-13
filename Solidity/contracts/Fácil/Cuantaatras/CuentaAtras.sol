// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CuentaAtras{

    uint256 TiempoInicio;
    uint256 TiempoJuego = 60;

    constructor(){
        TiempoInicio = block.timestamp;
    } 

    function SetTiempoJuego(uint256 tiempo) external{

        TiempoJuego = tiempo;
    }

    function GetDuration() external view returns(uint256){
        return TiempoJuego;
    }
    function restablecer() external{
        TiempoInicio = block.timestamp;
    }
    function tiemporestante () public view returns(uint256){
        require(TiempoInicio <= block.timestamp, "No valido");
        uint256 diff = block.timestamp - TiempoInicio;
        uint256 rest = TiempoJuego - diff;
        return rest;
    }


}