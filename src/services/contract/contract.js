const { Web3 } = require('web3');
const {Abi, CAddress, rpc} = require("../../../../contract/config")


const web3 = new Web3(rpc);


console.log(Abi, CAddress, rpc);
console.log(web3);




const Contract = new web3.eth.Contract(Abi, CAddress)

console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log("Contract")
console.log(Contract.methods.symbol().call().then(data => {
  console.log(data);
})
.catch(err => {
  console.log(err);
}))