import React, {useState , useEffect  } from 'react';
// main

import { ethers } from 'ethers';
import { connectingWithContract , connectWallet , CheckIfWalletConnected } from './helpers';

export const AppContext = React.createContext();

export const AppProvider = ({children})=> {
    const [account , setAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [Balance, setBalance] = useState("");
    const [contract, setContract] = useState(null);

    const fetchData = async()=>{
        try {
            const accounts = await window.ethereum.request({   // checks if metamask is available.
                method: "eth_requestAccounts",
            });
            const connectAccount = await connectWallet(); // asks user to the wallet if wallet is not connected to site
            setAccount(connectAccount);
            const provider = new ethers.providers.Web3Provider(window.ethereum); // gets provider from metamask , used to check the chain id etc etc , and can be utilised to prompt user to change networks if mismatched
            setProvider(provider);
            const getBal= await provider.getBalance(accounts[0]); // gets ether balance
            const balan = ethers.utils.formatEther(getBal); // special function to convert ether values into understandable format
            setBalance(balan); 
            const contract = await connectingWithContract();   // connects to contract  
            setContract(contract);
        } catch (error) {
            console.log(error);
        }
    }

    //to remove the auto login prompt please just remove the connect wallet function in the FetchData useEffect

    useEffect(() => {
        fetchData();
       }, []);

    const StoreStringNdUint =async({string , uintData})=>{  // data to send to the chain , data types or var does not need matching as smart contract but when passing it -
        try {const contract = await connectingWithContract() ;  // -it is necessary to keep the order same as the smart contract
        await contract.StoreString("Hello" , 100);//name must match contract function name // AS I SAID I AM BAD AT FRONT END I COULD NOT MAKE THE DATA PASS PROPERLY PLEASE DO TELL ME HOW TO FIX IT, JUST COMMIT
        } catch(err){
            console.log(err);
        }
    }

    const readString = async({address})=>{
        try {
            const contr = await connectingWithContract();
            await contr.getStoredString(address); 
            
        } catch (error) {
            console.log(error);
        }
    }

    //try doing the read uint

    return (
    <AppContext.Provider value={{account , provider , Balance , connectWallet , CheckIfWalletConnected , StoreStringNdUint, readString , contract
    }}>
     {children}
    </AppContext.Provider >
    )
}