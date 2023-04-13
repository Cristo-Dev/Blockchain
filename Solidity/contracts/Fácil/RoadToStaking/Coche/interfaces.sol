//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
    error MayorQueCero(); // creammos un error personalizado para poder ahorrar fees con revert en vez de usar require.
    

    interface ICarretera{
        function GetRutaA() external view returns(string memory);

    }

    contract coche{
        ICarretera iCarretera; // ya podemos hacer uso de la interface 
        string nombre;

        constructor(address _carretera){
            iCarretera = ICarretera(_carretera);
        }

        function SetNombre(string memory _nombre)external {

            _nombre = nombre;
        }

        function GetNombre() external view returns(string memory){
            return nombre;
        }

        function GetRuta() external view returns(string memory){
            iCarretera.GetRutaA;
        }
    }

    contract carretera{
        string rutaA;
        string rutaB;

        constructor(){
            rutaA = "Madrid-Barcelona";
            rutaB = "Madrid-Valencia";
    }


    function GetRutaA() external view returns(string memory){
            return rutaA;
    }
    function GetRutaB() external view returns(string memory){
            return rutaB;
    }
}