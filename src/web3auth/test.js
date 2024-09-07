
import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";
import { Web3AuthMPCCoreKit, WEB3AUTH_NETWORK } from "@web3auth/mpc-core-kit";
import { loginWithOAuth} from "@web3auth/mpc-core-kit/dist/mpcCoreKit.cjs"
import { tssLib } from "@toruslabs/tss-dkls-lib";
import { makeEthereumSigner } from "@web3auth/mpc-core-kit";
import { EthereumSigningProvider } from "@web3auth/ethereum-mpc-provider";


import Web3 from "web3";

const web3 = new Web3(provider);

// Get user's EOA address
const address = (await web3.eth.getAccounts())[0];

const fromAddress = (await web3.eth.getAccounts())[0];
const originalMessage = "YOUR_MESSAGE";

const signedMessage = await web3.eth.personal.sign(originalMessage, fromAddress);


const fromAddress = (await web3.eth.getAccounts())[0];

// Convert 0.0001 ether to wei
const amount = web3.utils.toWei("0.0001");

// This will perform self transfer of 0.0001 ETH.
const receipt = await web3.eth.sendTransaction({
  from: fromAddress,
  to: fromAddress,
  value: amount,
});




// Compressed pubKey
const pubKey = coreKitInstance.getPubKey();

// Uncompressed pubKey
const pubKeyPoint = Point.fromSEC1(secp256k1, pubKey.toString("hex"));
const uncompressedPubKey = pubKeyPoint.toSEC1(secp256k1).subarray(1);


const msg = Buffer.from("Welcome to Web3Auth");

// Returns the ECDSA signature bytes.
const signature = coreKitInstance.sign(msg);


const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Use 0xaa36a7 for Sepolia Testnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};


const ethereumProvider = new EthereumSigningProvider({ config: { chainConfig } });
ethereumProvider.setupProvider(makeEthereumSigner(coreKitInstance));






const coreKitInstance = new Web3AuthMPCCoreKit({ 
 web3AuthClientId: "BMPyU9PZgP0uFzMLdbz92A-ho1dMLZXgnheEpxaOFygccbpYtT4cvFZWBlMEySEK6E_eNwwUuRstj8O-1LJOvPM",
web3AuthNetwork: WEB3AUTH_NETWORK.MAINNET,
 manualSync: true, // This is the recommended approach
tssLib: tssLib, 
storage: window.storage,
baseUrl :'${window.location.origin}/serviceworker',
uxMode: 'popup or redirect',
redirectPathName: "url after the user logs in ,  Redirect Uri for OAuth is baseUrl/redirectPathName.",
disableHashedFactorKey: 'false',
hashedFactorNonce : "Web3AuthOptions.web3AuthClientId.",

baseUrl: "https://your-domain.com", // Your domain
redirectPathName: "auth", // Pathname where the user will be redirected after login

});


// const coreKitInstance = new Web3AuthMPCCoreKit(Web3AuthOptions);

async function intializeWeb3Auth() {
    try {
        await coreKitInstance.init({
            handleRedirectResult: true,
            rehydrate: true
        })
        console.log("Web3Auth Mpc Intialized Successfully")
    } catch (error) {
        console.error("Error Intializing Web3Auth MPC:", error)
    }
}

intializeWeb3Auth();

await coreKitInstance.init()


// const verifierConfig = {
//     subVerifierDetails: {
//       typeOfLogin : "google",
//       verifier: "w3a-google-demo",
//       clientId: "ds.jwcujkcjksd"
//     }  
// } as SubVerifierDetailsParams;

const verifierConfig = {
    aggregateVerifierIdentifier : "habtu",

    const subVerifierDetailsArray = [
        {
          typeOfLogin: "google",
          verifier: "w3a-google-demo",
          clientId: "ds.jwcujkcjksd",
        },
        {
          typeOfLogin: "apple",
          verifier: "w3a-apple-demo", // Replace with your Apple verifier name
          clientId: "YOUR_APPLE_CLIENT_ID", // Replace with your Apple Client ID
        },
        {
          typeOfLogin: "discord",
          verifier: "w3a-discord-demo", // Replace with your Discord verifier name
          clientId: "YOUR_DISCORD_CLIENT_ID", // Replace with your Discord Client ID
        },
        {
          typeOfLogin: "twitch",
          verifier: "w3a-twitch-demo", // Replace with your Twitch verifier name
          clientId: "YOUR_TWITCH_CLIENT_ID", // Replace with your Twitch Client ID
        },
      ],
      
     
    aggregateVerifierType : "single_id_verifier",

    importTssKey: "SECP256K1_PRIVATE_KEY_OR_ED25519_SEED",

} as AggregateVerifierLoginParams;

 // Example usage with Web3AuthMPCCoreKit
 import { Web3AuthMPCCoreKit, SubVerifierDetailsParams } from "@web3auth/mpc-core-kit";
              
 // Assuming coreKitInstance is already initialized
 
 // Login with Apple
 await coreKitInstance.loginWithOAuth(loginConfigs.apple as SubVerifierDetailsParams);
 
 // Login with Discord
 await coreKitInstance.loginWithOAuth(loginConfigs.discord as SubVerifierDetailsParams);
 
 // Login with Twitch
 await coreKitInstance.loginWithOAuth(loginConfigs.twitch as SubVerifierDetailsParams);


  // Example usage with Web3AuthMPCCoreKit
  import { Web3AuthMPCCoreKit, SubVerifierDetailsParams } from "@web3auth/mpc-core-kit";
      
  // Assuming coreKitInstance is already initialized
  
  // Iterate through the array to log in with each verifier
  for (const config of subVerifierDetailsArray) {
    await coreKitInstance.loginWithOAuth(config as SubVerifierDetailsParams);
  }
 


async function loginWithOAuth({

}) {

}


// Function to trigger login
async function login() {
    await web3auth.connect();
  }

  

  import { useEffect } from "react";
import { Web3Auth } from "@web3auth/web3auth";

const AuthPage = () => {
  useEffect(() => {
    const initWeb3Auth = async () => {
      const web3auth = new Web3Auth({
        clientId: "YOUR_CLIENT_ID", // Replace with your Web3Auth client ID
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x1", // Ethereum mainnet
          rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Replace with your RPC URL
        },
        baseUrl: "https://your-domain.com", // Your domain
        redirectPathName: "auth", // Pathname where the user is redirected after login
      });

      // Initialize Web3Auth and handle the login result
      await web3auth.init();

      // You can now get the user's info or connect to their wallet
      const user = web3auth.getUserInfo();
      console.log("User Info:", user);
    };

    initWeb3Auth(); // Call the init function when the component mounts
  }, []);

  return <div>Loading...</div>; // Display a loading state while initializing Web3Auth
};

export default AuthPage;


await coreKitInstance.logout();















> ማኔ ቴቄል ፋሬስ (Богатство Троица) 🦴:
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
// get it from https://dashboard.web3auth.io by creating a Plug n Play project.

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/ethereum.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: "sapphire_mainnet",
  privateKeyProvider: privateKeyProvider,
});



const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    loginConfig: {
      // Google login
      google: {
        verifier: "aggregate-sapphire", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "w3a-google", // Pass the Sub-Verifier here. eg w3a-google
        typeOfLogin: "google", // Pass the type of login provider.
        clientId: "519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com", // Pass the Google Client ID here.
      },
      // GitHub Login via Auth0
      github: {
        verifier: "aggregate-sapphire", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "w3a-a0-github", // Pass the Sub-Verifier here. eg w3a-a0-github
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "hiLqaop0amgzCC0AXo4w0rrG9abuJTdu", // Pass the Auth0 Client ID here.
      },
      // Email Password Login via Auth0
      emailpasswordless: {
        verifier: "aggregate-sapphire", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "w3a-a0-email-passwordless", // Pass the Sub-Verifier here. eg w3a-a0-email-passwordless
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "QiEf8qZ9IoasbZsbHvjKZku4LdnRC1Ct", // Pass the Client ID of your Auth0 Application.
      },
    },
  },
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);

// Initialize
await web3auth.init();

// When user clicks Google button, use this to Login with Google
const web3authProvider = await web3auth.connectTo("openlogin", {
  loginProvider: "google",
});

// When user clicks Email Passwordless button, use this to Login with Email Passwordless via Auth0
const web3authProvider = await web3auth.connectTo("openlogin", {
  loginProvider: "emailpasswordless",
  extraLoginOptions: {
    domain: "https://web3auth.au.auth0.com", // Pass the Auth0 Domain here, eg. https://web3auth.au.auth0.com
    // This corresponds to the field inside jwt which must be used to uniquely identify the user.
    verifierIdField: "email", // This is mapped b/w google and github logins.
    isVerifierIdCaseSensitive: false,
  },
});

// When user clicks GitHub button, use this to Login with GitHub via Auth0
const web3authProvider = await web3auth.connectTo("openlogin", {
  loginProvider: "github",
  extraLoginOptions: {
    domain: "https://web3auth.au.auth0.com", // Pass the Auth0 Domain here, eg. https://web3auth.au.auth0.com
    // This corresponds to the field inside jwt which must be used to uniquely identify the user.
    verifierIdField: "email", // This is mapped b/w google and github logins.
    isVerifierIdCaseSensitive: false,
  },
});
