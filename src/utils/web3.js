const ethers = require("ethers");
const privateKey = process.env.ACCOUNT_PRIVATE_KEY
const { Web3 } = require('web3');
const web3 = new Web3(process.env.RPC);

// Get Alchemy API Key
const API_KEY = process.env.Alchemy_API_Key; // process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider(process.env.Alchemy_Network, API_KEY)

// Create a signer
const signer = new ethers.Wallet(privateKey, provider)

// Get contract Address and ABI
const contractAddress = process.env.Contract_Address;
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721NonexistentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_fromTokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
            }
        ],
        "name": "BatchMetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "MetadataUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_packageID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_qty",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "Packages",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "packageID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_limit",
                "type": "uint256"
            }
        ],
        "name": "addPackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllPackages",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "uri",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "packageID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "limit",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NFT_Project.Package[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "packageID",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_limit",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
            }
        ],
        "name": "updatePackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)



const MintNFT = async (to, packageID, qty) => {
    try {
        console.log("- ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ - ~ -");
        console.log(myNftContract);

        // const overrides = {
        //     gasPrice: customGasPrice, // Custom gas price (in wei)
        //     gasLimit: customGasLimit // Custom gas limit (optional)
        // };

        let nftTxn = await myNftContract.Mint(to, packageID, qty)
        await nftTxn.wait()

        console.log(`NFT Minted! Check it out at: https://amoy.polygonscan.com/tx/${nftTxn.hash}`)
        return ({ success: true, msg: 'Mint successful' })

    } catch (e) {
        console.error('Error minting NFT:', e);

        // Log more details if available
        if (e.receipt) {
            console.error('Receipt:', e.receipt);
            return ({ success: false, error: 'Receipt: ' + e.receipt })
        }

        return ({ success: false, error: 'Error minting NFT: ' + e })
    }
}



const Create_Package = async (name,uri,limit)=>{
    try{
        console.log(myNftContract);

        let nftTxn = await myNftContract.addPackage(name,uri,limit)
        await nftTxn.wait()

        return ({ success: true, msg: 'Package Added Successfuly !' })
    } 
    catch(e)
    {
        console.log(e);
         return ({ success: false, error: 'Error Adding Package: ' + e })
    }
}



const Update_Package = async (packageID, limit, name,uri)=>{
    try{
        console.log(myNftContract);

        let nftTxn = await myNftContract.updatePackage(packageID, limit, name,uri)
        await nftTxn.wait()

        return ({ success: true, msg: 'Package updated Successfuly !' })
    } 
    catch(e)
    {
        console.log(e);
         return ({ success: false, error: 'Error Adding Package: ' + e })
    }
}

const getLatestPkgId = async ()=>{
    try{
        console.log(myNftContract);

        
// const myContract = new web3.eth.Contract(abi, contractAddress);
// const Packages = await myContract.methods.getAllPackages().call();
//         console.log('Packages :', Packages);


        let nftTxn = await myNftContract.getAllPackages()
        // await nftTxn.wait()
        console.log("length",nftTxn.length);
        console.log("length",nftTxn);
        console.log("nftTxn=======>",parseInt(nftTxn[nftTxn.length-1][2]) );
const pId = parseInt(nftTxn[nftTxn.length-1][2])
        return ({ success: true, msg: 'Package Added Successfuly !',packageId :pId })
    
    } 
    catch(e)
    {
        console.log(e);
         return ({ success: false, error: 'Error Adding Package: ' + e })
    }
}

module.exports = {
    MintNFT,
    Create_Package,
    getLatestPkgId,
    Update_Package
}







// const { Web3 } = require('web3');


// const web3 = new Web3(process.env.rpc);
// const contractAddress = process.env.contract || "0x9bB1a687675E289240cc7dc36A3310BAF07F375F";


// const myContract = new web3.eth.Contract(abi, contractAddress);
// // console.log("myContract", myContract);

// // Load private key from environment variable or use the hardcoded key (not recommended for production)
// const privateKey = process.env.ACCOUNT_PRIVATE_KEY;

// // Ensure the private key is properly formatted
// if (!privateKey || !privateKey.startsWith('0x') && privateKey.length !== 64) throw new Error('Invalid private key format. Make sure it is 64 characters long and starts with 0x.');

// // Add private key to the wallet
// const account = web3.eth.accounts.wallet.add(privateKey.startsWith('0x') ? privateKey : '0x' + privateKey);
// // console.log("account", account[0].address);



// // const Interact = async () => {
// //     try {
// //         const name = await myContract.methods.name().call();
// //         console.log('name :', name);
// //         return ({ success: true, msg: 'name fetched' })

// //     }
// //     catch (e) {
// //         console.log(e);
// //         return ({ success: false, error: 'Error fetching name: ' + e })
// //     }
// // }


// // const AddPackage = async (packageName = "sample Package 1", packageUri = "gmail.com", packageLimit = 10) => {
// //     try {
// //         // Send the transaction
// //         await myContract.methods.addPackage(packageName, packageUri, packageLimit).send({ from: account[0].address });
// //         console.log('Package added successfully');
// //         return ({ success: true, msg: 'Package added successfully' });

// //     } catch (e) {
// //         console.log('Error adding package: ', e);
// //         return ({ success: false, error: 'Error adding package: ' + e })
// //     }
// // };


// // const GetAllPackages = async () => {
// //     try {
// //         const Packages = await myContract.methods.getAllPackages().call();
// //         console.log('Packages :', Packages);
// //         return ({ success: true, msg: 'Packages fetched' })

// //     } catch (e) {
// //         console.log(e);
// //         return ({ success: false, error: 'Error getting packages: ' + e })
// //     }
// // };


// // const MintNFT = async (to = null, packageId = 0, qty = null) => {
// //     try {
// //         console.log("to", to, "packageId", packageId, "qty", qty);


// //         // Send the transaction with increased gas limit (example)
// //         const tx = await myContract.methods.Mint(to, packageId, qty).send({ from: accountAddress, gas: 500000 });

// //         // Log transaction hash
// //         console.log('Transaction Hash:', tx.transactionHash);
// //         console.log('Mint successful');
// //         return ({ success: true, msg: 'Mint successful' })

// //     } catch (e) {
// //         console.error('Error minting NFT:', e);

// //         // Log more details if available
// //         if (e.receipt) {
// //             console.error('Receipt:', e.receipt);
// //             return ({ success: false, error: 'Receipt: ' + e.receipt })
// //         }

// //         return ({ success: false, error: 'Error minting NFT: ' + e })
// //     }
// // };



// // module.exports = {
// //     account,
// //     Interact,
// //     AddPackage,
// //     GetAllPackages,
// //     MintNFT,
// // }