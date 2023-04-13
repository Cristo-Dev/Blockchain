// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositarDinero{

    struct Cuenta {
        uint256 saldo;
        bytes10 moneda;
    }
     mapping(address => mapping(bytes10 => Cuenta)) cuentas;

    function Depositar(uint256 cantidad, bytes10 moneda) external payable{
        require(msg.value == cantidad, "No estas ingresando la misma cantidad de dinero");
        Cuenta storage cuenta = cuentas[msg.sender][moneda];
        cuenta.saldo += cantidad;

        if(cuenta.moneda == ""){
            cuenta.moneda = moneda;
        }

    }
                                                                   //esa direeccion es pagable sino no podremos hacer pagos a esa direccion
    function RetirarSaldo(uint256 cantidad, bytes10 moneda,address payable wallet) external{
        Cuenta storage cuenta = cuentas[msg.sender][moneda];
        require(cuenta.saldo >= cantidad, "Saldo insuficiente en la cuenta");
        (bool success,) = wallet.call{value: cantidad}(""); // ("") es para enviar mensaje pero no pongo nada para ahorrar gas fees
        // , ) porque va a devolver varios datos pero solo nos interesa el tipo bool
        require(success, "No se ha realizado");
        cuenta.saldo -= cantidad;
    }

    function ConsultarSaldo(bytes10 moneda) external view returns(uint256){
        return cuentas[msg.sender][moneda].saldo;
    }
}