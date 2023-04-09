import { ethers } from "ethers";
import Web3Modal from "web3modal";
import ContractJson from "./Constants/contract.json"

// set up the helpers so that next can connect to the Blockchain.

export const ContractAbi = ContractJson.abi;

const ContractAddress = "0xC954022ae4626c8221371CDd862564e52EB5EdeC";

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

    export const convertTime = (time) => {  //converts Block.timestamp fetched from blockchain value to readable format
        const newTime = new Date(time *1000);
    
        const realTime = newTime.toLocaleString();
    
        return realTime;
    }
   