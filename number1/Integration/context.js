import React, {useState , useEffect  } from 'react';

// The Chain Id and Config can be setup in vanilla but I will use Thirdweb React Library to make it easy af.
//for non popular chains it needs the vanilla setup.

import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { connectingWithContract , connectWallet , CheckIfWalletConnected } from './helpers';

export const AppContext = React.createContext();

export const AppProvider = ({children})=> {
    const [account , setAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [Balance, setBalance] = useState("");

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
            await connectingWithContract();   // connects to contract  
        } catch (error) {
            console.log(error);
        }
    }

    //to remove the auto login prompt please just remove the connect wallet function in the FetchData useEffect

    useEffect(() => {
        fetchData();
       }, [])


       return(<ThirdwebProvider desiredChainId={ChainId.Mumbai}  // thirdweb has some default chains available, if you want to modify those please refer to Thirdweb's Docs
        >
        <AppContext.Provider value={{account , provider , Balance , connectWallet , CheckIfWalletConnected 
        }}>
            {children}
        </AppContext.Provider >
        </ThirdwebProvider>
    )
}