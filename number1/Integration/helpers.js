import { ethers } from "ethers";
import Web3Modal from "web3modal";
import ContractAbi from "./Constants/contract.json"

// set up the helpers so that next can connect to the Blockchain.


const ContractAddress = "0xE31FB1b4AA7458527d6b53461D84385e9b55FC91";

export const CheckIfWalletConnected = async()=> {
     try {
         if(!window.ethereum) return console.log("INSTALL METAMASK OR WEB3-Wallet");  // helper for future use
         const accounts = await window.ethereum.request({
             method: "eth_accounts",
         });
         const firstAccount = accounts[0];
         return firstAccount; 
     } catch (error) {
         console.log(error);
     }
 }

export const connectWallet = async()=> {
    try {
        if(!window.ethereum) return console.log("INSTALL METAMASK OR WEB3-Wallet"); //vanilla wallet connect
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
       // window.location.reload()
       return firstAccount;
    } catch (error) {
        console.log(error);
    }}

    export const connectingWithContract = async()=>{
        const fetchContract = (signerOrProvider)=>
      new ethers.Contract(ContractAddress , ContractAbi , signerOrProvider); // connects to the contract
        try {
            const web3modal = new Web3Modal();
            const connection = await web3modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            return contract;
        } catch (error) {
            console.log(error);
        }
    }  

    export const convertTime = (time) => {  //converts Block.timestamp value to readable format
        const newTime = new Date(time *1000);
    
        const realTime = newTime.toLocaleString();
    
        return realTime;
    }
   