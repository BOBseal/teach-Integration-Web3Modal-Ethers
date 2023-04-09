//SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0;

contract Test {
    struct Storage{
        string data;
        uint256 data2;
    }
    mapping(address => Storage) stringStorage;
    mapping(address => bytes32) hashStorage;

    function StoreString(string memory _string , uint256 _uintData) external {
        require(msg.sender != address(0));
        stringStorage[msg.sender].data = _string;
        stringStorage[msg.sender].data2 = _uintData;
    } 

    function getStoredString(address checkOf) external view returns(string memory) {
        return stringStorage[checkOf].data;
    } 
    function getStoredUint(address Of) external  view returns(uint256){
        return stringStorage[Of].data2;
    }
}