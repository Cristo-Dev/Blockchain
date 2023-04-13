// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CuentaAtras{

    uint256 TiempoInicio;
    uint256 TiempoVotacion = 60;
    struct Votante{
        uint peso;
        bool votado;
    }

    mapping(address => Votante) private votantes;

    constructor(){
        TiempoInicio = block.timestamp;
    } 

    function SetTiempoVotacion(uint256 tiempo) external{

        TiempoVotacion = tiempo;
    }

    function GetDuration() external view returns(uint256){
        return TiempoVotacion;
    }
    function restablecer() external{
        TiempoInicio = block.timestamp;
    }
    function tiemporestante () public view returns(uint256){
        require(TiempoInicio <= block.timestamp, "No valido");
        uint256 diff = block.timestamp - TiempoInicio;
        uint256 rest = TiempoVotacion - diff;
        return rest;
    }
    function getVoto() external view returns(Votante memory){
      return votantes[msg.sender];
   }
    function votar(uint _peso) external {
        require(tiemporestante() >= 0 , "Leggas tarde :(");
        Votante storage votante = votantes[msg.sender];
        votante.votado = true;
        votante.peso = _peso;

    }


}