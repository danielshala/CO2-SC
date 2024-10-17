const express = require("express");
const Web3 = require("web3").default;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// Initialize Web3 with Infura URL (Sepolia network)
const web3 = new Web3(process.env.INFURA_URL);

const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "emitCO2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mintTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0x96b15404b44133b9302b3d7ea979c5aa65e4e41e"; // New Sepolia contract address

// Instantiate the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// API Route to fetch token balance
app.get("/balance", async (req, res) => {
  const { address } = req.query;
  try {
    const balance = await contract.methods.balanceOf(address).call();
    res.json({ balance: web3.utils.fromWei(balance, "ether") });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching balance", details: error.message });
  }
});

// API Route to send tokens
app.post("/send", async (req, res) => {
  const { sender, recipient, amount } = req.body;

  try {
    console.log("Sender:", sender);
    console.log("Recipient:", recipient);
    console.log("Amount:", amount);

    // Get nonce for the sender address
    const nonce = await web3.eth.getTransactionCount(sender, "latest");
    console.log("Nonce:", nonce);

    // Convert token amount to Wei
    const amountInWei = web3.utils.toWei(amount, "ether");
    console.log("Amount in Wei:", amountInWei);

    // Build transaction object
    // Build transaction object
    const transaction = {
      to: contractAddress,
      gas: 500000,
      maxFeePerGas: web3.utils.toWei("30000", "gwei"), // Increase max fee to 200 gwei
      maxPriorityFeePerGas: web3.utils.toWei("20", "gwei"), // Set a higher priority fee
      nonce,
      data: contract.methods.transfer(recipient, amountInWei).encodeABI(),
    };

    // Log the transaction object before sending
    console.log("Transaction Object:", transaction);

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      process.env.PRIVATE_KEY
    );
    console.log("Signed Transaction:", signedTx); // Log signed transaction details

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Transaction Receipt:", receipt); // Log transaction receipt on success

    // Respond with transaction hash
    res.json({ transactionHash: receipt.transactionHash });
  } catch (error) {
    // Log the error with details
    console.error("Error during transaction:", error.message);
    if (error.reason) {
      console.error("Revert Reason:", error.reason); // Log revert reason if available
    }
    res
      .status(500)
      .json({ error: "Error sending tokens", details: error.message });
  }
});

app.post("/mint", async (req, res) => {
  const { recipient, amount } = req.body;

  try {
    const amountInWei = web3.utils.toWei(amount, "ether"); // Convert to wei

    const tx = {
      from: process.env.OWNER_ADDRESS,
      to: contractAddress,
      gas: 500000, // Gas limit
      maxFeePerGas: web3.utils.toWei("20", "gwei"), // Increase max fee
      maxPriorityFeePerGas: web3.utils.toWei("2", "gwei"), // Set priority fee
      data: contract.methods.mintTokens(recipient, amountInWei).encodeABI(),
    };

    // Sign the transaction with the private key
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.PRIVATE_KEY
    );

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.json({ transactionHash: receipt.transactionHash });
  } catch (error) {
    console.error("Minting error:", error); // This will log the full error
    res
      .status(500)
      .json({ error: "Error minting tokens", details: error.message });
  }
});

app.post("/burn", async (req, res) => {
  const { sender, amount } = req.body;

  try {
    const amountInWei = web3.utils.toWei(amount, "ether"); // Convert amount to wei

    const tx = {
      from: sender,
      to: contractAddress,
      gas: 500000,
      gasPrice: web3.utils.toWei("10", "gwei"),
      data: contract.methods.burn(amountInWei).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.PRIVATE_KEY
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    res.json({ transactionHash: receipt.transactionHash });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error burning tokens", details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
