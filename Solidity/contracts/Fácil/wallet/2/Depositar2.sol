// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DepositarDinero{

    struct Cuenta {
        uint256 saldo;
        uint256 TInicio;
        uint256 TBloqueo;
    }
     mapping(address => mapping(bytes10 => Cuenta)) cuentas;
     event Depositado(address indexed user, uint256 cantidad); //Indexed se usa para filtar eventos
     event Retirado(address indexed user, uint256 cantidad);

    function Depositar(uint256 cantidad, bytes10 moneda, uint256 TiempodeBloqueo) external payable{
        require(msg.value == cantidad, "No estas ingresando la misma cantidad de dinero");
        Cuenta storage cuenta = cuentas[msg.sender][moneda];
        cuenta.saldo += cantidad;
        cuenta.TBloqueo = TiempodeBloqueo;
        cuenta.TInicio = block.timestamp;
        emit Depositado(msg.sender, cantidad);//Emit para emitir el evento que hemos creado

    }
                                                                   //esa direeccion es pagable sino no podremos hacer pagos a esa direccion
    function RetirarSaldo(uint256 cantidad, bytes10 moneda,address payable wallet) external{
        Cuenta storage cuenta = cuentas[msg.sender][moneda];
        require(cuenta.saldo >= cantidad, "Saldo insuficiente en la cuenta");
        require(cuenta.TBloqueo == 0, "Tu saldo sigue bloqueado");
        (bool success,) = wallet.call{value: cantidad}(""); // ("") es para enviar mensaje pero no pongo nada para ahorrar gas fees
        // , ) porque va a devolver varios datos pero solo nos interesa el tipo bool
        require(success, "No se ha realizado");
        cuenta.saldo -= cantidad;
        cuenta.TInicio = block.timestamp;
        emit Retirado(msg.sender, cantidad);
    }

    function TiempoRst(bytes10 moneda) external view returns(uint256){
        Cuenta memory cuenta = cuentas[msg.sender][moneda]; // cuando solo queremos leer los datos usamos memory cuando queremos almacenarlos usamos storage
        require(cuenta.TInicio <= block.timestamp, "No valido");
        uint256 diff = block.timestamp - cuenta.TInicio;
        uint256 restante = diff >= cuenta.TBloqueo ? 0 : cuenta.TBloqueo - diff;
        return restante;

    }

    function ActualizarBloqeuo(bytes10 moneda , uint256 TiempoBloqueo, bool reiniciar) external {
        Cuenta storage cuenta = cuentas[msg.sender][moneda];
        require(TiempoBloqueo > cuenta.TBloqueo, "No puedes aaadir menos tiempo del que tienes");
        if(reiniciar){
            cuenta.TInicio = block.timestamp;
        }

    }

    function ConsultarSaldo(bytes10 moneda) external view returns(uint256){
        return cuentas[msg.sender][moneda].saldo;
    }
}