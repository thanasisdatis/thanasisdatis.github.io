import axios from "axios";
import { ethers } from "ethers";
import University from "contracts/University.json";
import { useNavigate } from "react-router";
const API_URL_USERS = "http://localhost:5000/users";
const API_URL_AUTH = "http://localhost:5000/auth";
let provider;
let tempProvider;
let coinbase;
const LS_KEY = "login-with-metamask:auth";
let response;
let selectedAccount;
let UniversityContract;

const handleAuthenticate = async (response) => {
  return await axios
    .post(`${API_URL_AUTH}`, {
      publicAddress: response.publicAddress,
      signature: response.signature,
    })
    .then((response) => response.data);
};

const handleSignMessage = async (response) => {
  console.log(response.publicAddress);
  console.log(response.nonce);
  if (response.publicAddress !== undefined) {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(response.publicAddress);
      console.log(signer);
      const signature = await signer.signMessage(
        `I am signing my one-time nonce: ${response.nonce}`,
        response.publicAddress,
        "" // MetaMask will ignore the password argument here
      );
      let publicAddress = response.publicAddress;
      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  }
};

const handleSignup = async (publicAddress, users) => {
  console.log(users);
  console.log(publicAddress);

  return await axios
    .post(`${API_URL_USERS}/register`, {
      publicAddress: publicAddress,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    });
};

export const handleLoggedIn = (response) => {
  localStorage.setItem(LS_KEY, JSON.stringify(response));
  return response;
};

const LogIn = async () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((account) => {
        coinbase = account[0];
        console.log(coinbase);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Need to install MetaMask");
  }
  console.log("asdasd");

  if (!tempProvider) {
    try {
      // Request account access if needed
      await window.ethereum.enable();
      //const provider = window.ethereum.enable();
      // We don't know window.web3 version, so we use our own instance of Web3
      // with the injected provider given by MetaMask
      tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(tempProvider);
    } catch (error) {
      window.alert("You need to allow MetaMask.");
      return;
    }
  }

  if (!coinbase) {
    window.alert("Please activate MetaMask first.");
    return;
  }

  const publicAddress = coinbase.toLowerCase();
  console.log(publicAddress);
  //setLoading(true);

  // Look if user with current publicAddress is already present on backend
  await axios
    .get(`${API_URL_USERS}?publicAddress=${publicAddress}`)
    .then((response) => response.data)
    // If yes, retrieve it. If no, create it.
    //users?.length ? users[0] : handleSignup(publicAddress))
    .then((users) =>
      users?.length ? users[0] : handleSignup(publicAddress, users)
    )
    // Popup MetaMask confirmation modal to sign message
    //handleSignMessag
    .then(handleSignMessage)
    // Send signature to backend on the /auth route
    .then(handleAuthenticate)
    // Pass accessToken back to parent component (to save it in localStorage)
    .then(handleLoggedIn)
    .then((finalResponse) => {
      response = finalResponse;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

const checkIfUserIsValid = async (url, accessToken) => {
  await axios
    .get(`${url}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

const initliazeSmartContract = async () => {
  const node_URL =
    "https://speedy-nodes-nyc.moralis.io/2419483b209f2dd68775d17e/polygon/mumbai";
  const Ethers = new ethers.providers.JsonRpcProvider(node_URL);

  let tempSigner = Ethers.getSigner();
  //const network = await Ethers.getNetwork().chainId;
  //console.log(network);
  //const chainId = network.chainId;
  //console.log(chainId);
  const address = "0x59DF8c9a71AC757A8E4CF727BE4914C691B414D3";
  //0x621F62ec8f84bFAcb90c64F96Ef5271637c5A7C8
  console.log(tempSigner);
  UniversityContract = new ethers.Contract(
    address,
    //University.networks[chainId].address,
    University.abi,
    Ethers
    //Ethers.getSigner()
  );

  console.log(UniversityContract);
};

const initialSmartContractWithSigner = async () => {
  provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log(University);
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
    // If user change account on metamask you can console log their address
    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const Ethers = new ethers.providers.Web3Provider(window.ethereum);

  let tempSigner = Ethers.getSigner();
  //const network = await Ethers.getNetwork().chainId;
  //console.log(network);
  //const chainId = network.chainId;
  //console.log(chainId);
  const address = "0x59DF8c9a71AC757A8E4CF727BE4914C691B414D3";
  console.log(tempSigner);
  UniversityContract = new ethers.Contract(
    address,
    //University.networks[chainId].address,
    University.abi,
    Ethers.getSigner()
  );

  console.log(UniversityContract);
};

const returnOwner = async () => {
  const apotelesma = UniversityContract.returnOwner();
  return apotelesma;
};

const returnDegree = async (_sha26PDF) => {
  console.log(_sha26PDF);
  const apotelesma = await UniversityContract.getDegree(_sha26PDF);
  return apotelesma;
};

const createDegree = async (_sha26PDF, name, surname, _date) => {
  console.log(_sha26PDF);
  console.log(name);
  console.log(surname);
  const apotelesma = UniversityContract.addNewDegree(
    _sha26PDF,
    name,
    surname,
    _date
  );
  return apotelesma;
};

const addModerator = async (_address, name, surname) => {
  console.log(_address);
  console.log(name);
  console.log(surname);
  const apotelesma = UniversityContract.addModerator(_address, name, surname);
  return apotelesma;
};

const authService = {
  LogIn,
  checkIfUserIsValid,
  initliazeSmartContract,
  returnOwner,
  returnDegree,
  createDegree,
  initialSmartContractWithSigner,
  addModerator,
};
export default authService;
