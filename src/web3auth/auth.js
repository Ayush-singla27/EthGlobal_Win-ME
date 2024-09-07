// import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";
// import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";
// import { tssLib } from "@toruslabs/tss-dkls-lib";
// import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
// import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider";
// import Web3 from "web3";

// const web3 = new Web3(provider);

// // Get user's EOA address
// const address = (await web3.eth.getAccounts())[0];

// const fromAddress = (await web3.eth.getAccounts())[0];
// const originalMessage = "YOUR_MESSAGE";

// const signedMessage = await web3.eth.personal.sign(originalMessage, fromAddress);


// const fromAddress = (await web3.eth.getAccounts())[0];

// // Convert 0.0001 ether to wei
// const amount = web3.utils.toWei("0.0001");

// // This will perform self transfer of 0.0001 ETH.
// const receipt = await web3.eth.sendTransaction({
//   from: fromAddress,
//   to: fromAddress,
//   value: amount,
// });


// // Compressed pubKey
// const pubKey = coreKitInstance.getPubKey();

// // Uncompressed pubKey
// const pubKeyPoint = Point.fromSEC1(secp256k1, pubKey.toString("hex"));
// const uncompressedPubKey = pubKeyPoint.toSEC1(secp256k1).subarray(1);


// const msg = Buffer.from("Welcome to Web3Auth");

// // Returns the ECDSA signature bytes.
// const signature = coreKitInstance.sign(msg);


// const ethereumProvider = new EthereumSigningProvider({ config: { chainConfig } });
// ethereumProvider.setupProvider(makeEthereumSigner(coreKitInstance));


// const coreKitInstance = new Web3AuthMPCCoreKit(Web3AuthOptions);

// async function intializeWeb3Auth() {
//     try {
//         await coreKitInstance.init({
//             handleRedirectResult: true,
//             rehydrate: true
//         })
//         console.log("Web3Auth Mpc Intialized Successfully")
//     } catch (error) {
//         console.error("Error Intializing Web3Auth MPC:", error)
//     }
// }

// intializeWeb3Auth();

// await coreKitInstance.init()


  




















import React from 'react'; // Import React to use JSX
import { useEffect, useState } from "react"; // Other imports...

//import { useEffect, useState } from "react";
// IMP START - Quick Start
import {
  TssShareType,
  COREKIT_STATUS,
  keyToMnemonic,
  mnemonicToKey,
  
} from "@web3auth/mpc-core-kit";

import { generateFactorKey } from '@web3auth/mpc-core-kit';

import { Web3AuthMPCCoreKit } from '@web3auth/mpc-core-kit';
import { WEB3AUTH_NETWORK } from '@web3auth/mpc-core-kit';
import { EthereumSigningProvider } from '@web3auth/ethereum-mpc-provider';
import { makeEthereumSigner } from '@web3auth/mpc-core-kit';
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
// IMP END - Quick Start
import { BN } from "bn.js";
import { tssLib } from "@toruslabs/tss-dkls-lib";

import EthereumRpc from './ethersRPC';
//import RPC from "./web3RPC"; // for using web3.js

// import RPC from "./viemRPC"; // for using viem
// import RPC from "./ethersRPC"; // for using ethers.js

// IMP START - SDK Initialization
// IMP START - Dashboard Registration
const web3AuthClientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};


// const coreKitInstance = new Web3AuthMPCCoreKit({ 
//   web3AuthClientId: "BMPyU9PZgP0uFzMLdbz92A-ho1dMLZXgnheEpxaOFygccbpYtT4cvFZWBlMEySEK6E_eNwwUuRstj8O-1LJOvPM",
//  web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
//   manualSync: true, // This is the recommended approach
//  tssLib: tssLib, 
//  storage: window.localStorage,
//  baseUrl :'${window.location.origin}/serviceworker',
//  uxMode: 'redirect',
//  redirectPathName: "url after the user logs in ,  Redirect Uri for OAuth is baseUrl/redirectPathName.",
//  disableHashedFactorKey: 'false',
//  hashedFactorNonce : "Web3AuthOptions.web3AuthClientId.", 
//  baseUrl: "https://your-domain.com", // Your domain
//  redirectPathName: "auth", // Pathname where the user will be redirected after login
//  });

 const coreKitInstance = new Web3AuthMPCCoreKit({ 
  web3AuthClientId: web3AuthClientId, // Reuse the client ID variable
  web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
  manualSync: true, // This is the recommended approach
  tssLib: tssLib, 
  storage: window.localStorage, // Corrected storage
  baseUrl: window.location.origin + '/serviceworker', // Corrected baseUrl
  uxMode: 'popup', // Choose 'popup' or 'redirect'
  redirectPathName: "/auth", // Provide valid redirect path
  disableHashedFactorKey: false, // Use a boolean
  hashedFactorNonce: web3AuthClientId, // Corrected to use the clientId variable
});


// Setup evmProvider for EVM Chain
const evmProvider = new EthereumSigningProvider({ config: { chainConfig } });
evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
// IMP END - SDK Initialization



const verifierConfig = {
  aggregateVerifierIdentifier: "habtu",
  subVerifierDetailsArray: [
    {
      typeOfLogin: "google",
      verifier: "w3a-google-demo",
      clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
    },
    {
      typeOfLogin: "apple",
      verifier: "w3a-apple-auth0", // This should match the Auth0 verifier name for Apple
      clientId: "YOUR_APPLE_AUTH0_CLIENT_ID", // Replace with your Auth0 Client ID for Apple
    },
    {
      typeOfLogin: "twitter",
      verifier: "w3a-twitter-auth0", // This should match the Auth0 verifier name for Twitter
      clientId: "YOUR_TWITTER_AUTH0_CLIENT_ID", // Replace with your Auth0 Client ID for Twitter
    },
    {
      typeOfLogin: "passwordless",
      verifier: "w3a-passwordless-auth0", // This should match the Auth0 verifier name for Passwordless
      clientId: "YOUR_PASSWORDLESS_AUTH0_CLIENT_ID", // Replace with your Auth0 Client ID for Passwordless
    },
  ],
  aggregateVerifierType: "single_id_verifier",
  importTssKey: "SECP256K1_PRIVATE_KEY_OR_ED25519_SEED",
};


function AuthApp() {
  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(COREKIT_STATUS.NOT_INITIALIZED);
  const [backupFactorKey, setBackupFactorKey] = useState("");
  const [mnemonicFactor, setMnemonicFactor] = useState("");

  useEffect(() => {
    const init = async () => {
      // IMP START - SDK Initialization
      await coreKitInstance.init();
      // IMP END - SDK Initialization

      setCoreKitStatus(coreKitInstance.status);
    };
    init();
  }, []);

  const loginWithGoogle = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error('initiated to login');
      }

      // IMP START - Login
      const verifierConfig = {
        aggregateVerifierIdentifier: "aggregate-sapphire",
        subVerifierDetailsArray: [
          {
            typeOfLogin: "google",
            verifier: "w3a-google",
            clientId: "519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com",
            jwtParams: {
              verifierIdField: "email",
            }
          },
        ],
      } 

      await coreKitInstance.loginWithOAuth(verifierConfig);
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges(); // Needed for new accounts
      }
      // IMP END - Login

      // IMP START - Recover MFA Enabled Account
      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        uiConsole(
          "required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]"
        );
      }
      // IMP END - Recover MFA Enabled Account

      setCoreKitStatus(coreKitInstance.status);

    } catch (error) {
      uiConsole(error);
    }
  }

  const loginWithAuth0GitHub = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error('initiated to login');
      }

      // IMP START - Login
      const verifierConfig = {
        aggregateVerifierIdentifier: "aggregate-sapphire",
        subVerifierDetailsArray: [
          {
            typeOfLogin: "jwt",
            verifier: "w3a-a0-github",
            clientId: "hiLqaop0amgzCC0AXo4w0rrG9abuJTdu",
            jwtParams: {
              connection: "github",
              domain: "https://web3auth.au.auth0.com",
              verifierIdField: "email",
            }
          },
        ],
      }

      await coreKitInstance.loginWithOAuth(verifierConfig);
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges(); // Needed for new accounts
      }
      // IMP END - Login

      // IMP START - Recover MFA Enabled Account
      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        uiConsole(
          "required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]"
        );
      }
      // IMP END - Recover MFA Enabled Account

      setCoreKitStatus(coreKitInstance.status);

    } catch (error) {
      uiConsole(error);
    }
  }

  const loginWithAuth0EmailPasswordless = async () => {
    try {
      if (!coreKitInstance) {
        throw new Error('initiated to login');
      }

      // IMP START - Login
      const verifierConfig = {
        aggregateVerifierIdentifier: "aggregate-sapphire",
        subVerifierDetailsArray: [
          {
            typeOfLogin: "jwt",
            verifier: "w3a-a0-email-passwordless",
            clientId: "QiEf8qZ9IoasbZsbHvjKZku4LdnRC1Ct",
            jwtParams: {
              // connection: "passwordless",
              domain: "https://web3auth.au.auth0.com",
              verifierIdField: "email",
            }
          },
        ],
      } 

      await coreKitInstance.loginWithOAuth(verifierConfig);
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges(); // Needed for new accounts
      }
      // IMP END - Login

      // IMP START - Recover MFA Enabled Account
      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        uiConsole(
          "required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]"
        );
      }
      // IMP END - Recover MFA Enabled Account

      setCoreKitStatus(coreKitInstance.status);

    } catch (error) {
      uiConsole(error);
    }
  }

  // IMP START - Recover MFA Enabled Account
  const inputBackupFactorKey = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    if (!backupFactorKey) {
      throw new Error("backupFactorKey not found");
    }
    const factorKey = new BN(backupFactorKey, "hex");
    await coreKitInstance.inputFactorKey(factorKey);

    setCoreKitStatus(coreKitInstance.status);

    if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
      uiConsole(
        "required more shares even after inputing backup factor key, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]"
      );
    }
  };
  // IMP END - Recover MFA Enabled Account

  // IMP START - Enable Multi Factor Authentication
  const enableMFA = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    try {
      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges();
      }

      const factorKey = await coreKitInstance.enableMFA({});
      const factorKeyMnemonic = keyToMnemonic(factorKey);

      uiConsole("MFA enabled, device factor stored in local store, deleted hashed cloud key, your backup factor key: ", factorKeyMnemonic);

      if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
        await coreKitInstance.commitChanges();
      }

      uiConsole("MFA enabled, device factor stored in local store, deleted hashed cloud key, your backup factor key is associated with the firebase email password account in the app");
    } catch (e) {
      uiConsole(e);
    }
  };
  // IMP END - Enable Multi Factor Authentication

  const keyDetails = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    uiConsole(coreKitInstance.getKeyDetails());
  };

  const getDeviceFactor = async () => {
    try {
        const factorKey = await coreKitInstance.getDeviceFactor();
        if (factorKey !== undefined) {
            setBackupFactorKey(factorKey); // No assertion needed
            uiConsole("Device share: ", factorKey);
        } else {
            uiConsole("Device factor key is undefined.");
        }
    } catch (e) {
        uiConsole(e);
    }
};

  const exportMnemonicFactor = async () => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    uiConsole("export share type: ", TssShareType.RECOVERY);
    const factorKey = generateFactorKey();
    await coreKitInstance.createFactor({
      shareType: TssShareType.RECOVERY,
      factorKey: factorKey.private,
    });
    const factorKeyMnemonic = await keyToMnemonic(factorKey.private.toString("hex"));
    if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
      await coreKitInstance.commitChanges();
    }
    uiConsole("Export factor key mnemonic: ", factorKeyMnemonic);
  };

  const MnemonicToFactorKeyHex = async (mnemonic) => {
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    try {
      const factorKey = await mnemonicToKey(mnemonic);
      setBackupFactorKey(factorKey);
      return factorKey;
    } catch (error) {
      uiConsole(error);
    }
  };

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = coreKitInstance.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await coreKitInstance.logout();
    // IMP END - Logout
    setCoreKitStatus(coreKitInstance.status);
    uiConsole("logged out");
  };

  // IMP START - Blockchain Calls
  const getChainId = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const getAccounts = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider );
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider );
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider );
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const readContract = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider);
    const message = await rpc.readContract();
    uiConsole(message);
  };

  const writeContract = async () => {
    if (!evmProvider) {
      uiConsole("evmProvider not initialized yet");
      return;
    }
    const rpc = new EthereumRpc(evmProvider);
    const receipt = await rpc.writeContract();
    uiConsole(receipt);
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };
  // IMP END - Blockchain Calls

  const criticalResetAccount = async () => {
    // This is a critical function that should only be used for testing purposes
    // Resetting your account means clearing all the metadata associated with it from the metadata server
    // The key details will be deleted from our server and you will not be able to recover your account
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    //@ts-ignore
    // if (selectedNetwork === WEB3AUTH_NETWORK.MAINNET) {
    //   throw new Error("reset account is not recommended on mainnet");
    // }
    await coreKitInstance.tKey.storageLayer.setMetadata({
      privKey: new BN(coreKitInstance.state.postBoxKey ? coreKitInstance.state.postBoxKey : "0", "hex"),
      input: { message: "KEY_NOT_FOUND" },
  });
    if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
      await coreKitInstance.commitChanges();
    }
    uiConsole("reset");
    logout();
  };

  function uiConsole(...args) {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  }

  const loggedInView = (
    
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={keyDetails} className="card">
            Key Details
          </button>
        </div>
        <div>
          <button onClick={enableMFA} className="card">
            Enable MFA
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={readContract} className="card">
            Read from Contract
          </button>
        </div>
        <div>
          <button onClick={writeContract} className="card">
            Write a Contract
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
        <div>
          <button onClick={criticalResetAccount} className="card">
            [CRITICAL] Reset Account
          </button>
        </div>
        <div>
          <button onClick={exportMnemonicFactor} className="card">
            Generate Backup (Mnemonic)
          </button>
        </div>
      </div>
    
  );

  const unloggedInView = (
    <div>
    
      <button onClick={loginWithGoogle} className="card">
        Login with Google
      </button>
      <button onClick={loginWithAuth0GitHub} className="card">
        Login with Auth0 GitHub
      </button>
      <button onClick={loginWithAuth0EmailPasswordless} className="card">
        Login with Auth0 Email Passwordless
      </button>
      <div className={coreKitStatus === COREKIT_STATUS.REQUIRED_SHARE ? "" : "disabledDiv"}>
        <button onClick={() => getDeviceFactor()} className="card">
          Get Device Factor
        </button>
        <label>Recover Using Mnemonic Factor Key:</label>
        <input value={mnemonicFactor} onChange={(e) => setMnemonicFactor(e.target.value)}></input>
        <button onClick={() => MnemonicToFactorKeyHex(mnemonicFactor)} className="card">
          Get Recovery Factor Key using Mnemonic
        </button>
        <label>Backup/ Device Factor: {backupFactorKey}</label>
        <button onClick={() => inputBackupFactorKey()} className="card">
          Input Backup Factor Key
        </button>
        <button onClick={criticalResetAccount} className="card">
          [CRITICAL] Reset Account
        </button>

      </div>

      </div>
    
  );

  return (
    <div className="container">
      <h1 className="title">
        <a target="_blank" href="https://web3auth.io/docs/sdk/core-kit/mpc-core-kit/" rel="noreferrer">
          Web3Auth MPC Core Kit
        </a>{" "}
        Aggregate Verifier Example
      </h1>

      <div className="grid">{coreKitStatus === COREKIT_STATUS.LOGGED_IN ? loggedInView : unloggedInView}</div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>

      <footer className="footer">
        <a
          href="https://github.com/Web3Auth/web3auth-core-kit-examples/tree/main/mpc-core-kit-web/quick-starts/mpc-core-kit-react-quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source code
        </a>
      </footer>
    </div>
  );
}

export default AuthApp;
