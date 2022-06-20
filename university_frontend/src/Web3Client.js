import Web3 from "web3";
//import University from "./University.json";
import University from "contracts/University.json";
let selectedAccount;
let universitySmartContract;
// state variable to set account.
export function init() {
  async function load() {
    // Connect to WEB3 and to your blockchain locally (second option below) to interact with your smart contracts.
    // This configuation exist in truffle-config.js file
    const provideUrl = new Web3(Web3.givenProvider || "http://localhost:7545");
    // Check if metamask is installed
    let provider = window.ethereum;

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

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    console.log(networkId);
    console.log("hello");
    universitySmartContract = new web3.eth.Contract(
      University.abi,
      University.networks[networkId].address
    );
    console.log(universitySmartContract);
  }
  load();
}

export const addNewDegree = async (_sha26PDF, name, surname) => {
  console.log("fired");
  return (
    universitySmartContract.methods
      .addNewDegree(_sha26PDF, name, surname)
      //from my wallet
      .send({ from: selectedAccount }, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the transaction: " + res);
      })
  );
  // .then((response) => {
  //   console.log(response);
  // })
  // .catch((error) => console.log(error));
};

export const returnOwner = async () => {
  console.log("fired");

  const apotelesma = universitySmartContract.methods
    .returnOwner()
    .call(function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Owner address is: ", res);
    });
  return apotelesma;
};

export const returnDegree = async (_sha26PDF) => {
  console.log("fired");

  const apotelesma = universitySmartContract.methods
    .getDegree(_sha26PDF)
    .call(function (err, res) {
      if (err) {
        console.log("An error occured", err);
        return;
      }
      console.log("Owner degree is: ", res);
    });
  return apotelesma;
};
