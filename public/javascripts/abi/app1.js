var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
console.log("web3", web3);

let hzAccous = [];

web3.eth.getAccounts().then(function (accouts) {
	hzAccous = accouts;
	console.log(hzAccous);
});

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_goodsName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_details",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "imglist",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_continue",
				"type": "uint256"
			}
		],
		"name": "applyAuction_huangzishun",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
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
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AuctionEndedEvt_huangzishun",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "starter",
				"type": "address"
			}
		],
		"name": "AuctionStartEvt_huangzishun",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "bidder_huangzishun",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "BidEvt_huangzishun",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ethToToken_huangzishun",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "HighBidEvt_huangzishun",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "overtime_huangzishun",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "remove_huangzishun",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "setAuctionEnd_huangzishun",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_timeLimit",
				"type": "uint256"
			}
		],
		"name": "setAuctionStart_huangzishun",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "actionnumber",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owners",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "goodName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "continueTime",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "imglist",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isAuctionEnd",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isExist",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct OpenAuction_huangzishun.Goods_huangzishun",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
		"name": "actionList_huangzishun",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "actionnumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owners",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "goodName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "details",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "continueTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAuctionEnd",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isExist",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin_huangzishun",
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
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Appreciate_huangzishun",
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
		"name": "auctionLimit_huangzishun",
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
		"inputs": [],
		"name": "auctionNumber_huangzishun",
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
		"inputs": [],
		"name": "auctionStart_huangzishun",
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
				"internalType": "address",
				"name": "account",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dealList_huangzishun",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "gainer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_goods",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_values",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tradingHour",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endFlg_huangzishun",
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
		"name": "getActionList_huangzishun",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "actionnumber",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owners",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "goodName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "continueTime",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "imglist",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isAuctionEnd",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isExist",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct OpenAuction_huangzishun.Goods_huangzishun[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getauctionTime_huangzishun",
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
		"inputs": [],
		"name": "getBidderTime_huangzishun",
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
		"inputs": [],
		"name": "getBlocktimestamp_huangzishun",
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
		"inputs": [],
		"name": "getDealList_huangzishun",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "x",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "gainer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_goods",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_values",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "_startTime",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tradingHour",
						"type": "uint256"
					}
				],
				"internalType": "struct OpenAuction_huangzishun.Deal_huangzishun[]",
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
				"name": "_Pid",
				"type": "uint256"
			}
		],
		"name": "getGoodlist_huangzishun",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "actionnumber",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owners",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "goodName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "details",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "continueTime",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "imglist",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isAuctionEnd",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isExist",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "startTime",
						"type": "uint256"
					}
				],
				"internalType": "struct OpenAuction_huangzishun.Goods_huangzishun",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "highestBid_huangzishun",
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
		"inputs": [],
		"name": "highestBidder_huangzishun",
		"outputs": [
			{
				"internalType": "address payable",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "isGoods_huangzishun",
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
		"name": "minValue_huangzishun",
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
		"name": "startFlg_huangzishun",
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
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var myContract = new web3.eth.Contract(abi, "0xDdc72838327e3294584e2C14fe9c2D69fDdf8DaE");

function start() {
	var number = prompt("请输入拍卖品的序号")
	myContract.methods.setAuctionStart_huangzishun(parseInt(number))
		.send({
			from: hzAccous[0],
			gas: 1500000,
			gasPrice: '30000000'
		})
		.then(function (receipt, err) {
			if (err == undefined) {
				alert("拍卖开始启动")
				window.location.href = "/first/" + number;
			} else {
				alert("拍卖开始启动失败")
				window.location.href = "/"
			}
		})
};

function seller1() {
	var img1 = $('#img1').val();
	var img2 = $('#img2').val();
	var img3 = $('#img3').val();
	var describe = $('#describe').val();
	var GoodsName = $('#GoodsName').val();
	var price = $('#price').val();
	var time = $('#time').val();
	myContract.methods.applyAuction_huangzishun(parseInt(price), GoodsName, describe, [img1, img2, img3], parseInt(time))
		.send({
			from: hzAccous[0],
			gas: 1500000,
			gasPrice: '3000000'
		})
		.then(function (receipt, err) {
			if (err == undefined) {
				alert("申请拍卖成功")
				window.location.href = "/seller"
			} else {
				alert("申请拍卖失败")
				window.location.href = "/seller"
			}
		})
}

function bidderSend() {
	var bidder1 = $('#bidder').val();
	var bidder12 = parseInt(bidder1)
	myContract.methods.bidder_huangzishun()
		.send({
			from: hzAccous[0],
			value: bidder12,
			gas: 1500000,
			gasPrice: '30000000'
		})
		.then(function (receipt, err) {
			console.log(receipt);
			console.log(err);
			if (err == undefined) {
				alert("出价成功")
				window.location.href = "/"
			} else {
				alert("出价失败")
				window.location.href = "/"
			}
		})
}


function setAuctionEnd() {
	myContract.methods.setAuctionEnd_huangzishun()
		.send({
			from: hzAccous[0],
			gas: 1500000,
			gasPrice: '30000000'
		})
		.on('receipt', function (confirmationNumber, receipt) {
			alert("拍卖结束成功")
			window.location.href = "/"
		})
		.on('error', function (error, receipt) { // 如果交易被网络拒绝并带有交易收据，则第二个参数将是交易收据。
			console.log(error);
			alert("拍卖结束失败")
			window.location.href = "/"
		});
	// .then(function(receipt,err){
	// 	console.log(receipt);
	// 	console.log(err);
	// if(err==undefined){
	// 	alert("拍卖结束成功")
	// 	window.location.href="/"
	// }else{
	// 	alert("拍卖结束成功")
	// 	window.location.href="/"
	// }
	// })
}


function balanceOf() {
	myContract.methods.balanceOf(hzAccous[0]).call({ from: hzAccous[0] }).then(function (result) {
		alert('查询账户：' + hzAccous[0] + "ERC20余额为" + result)
	})
}

function ethToToken() {
	var number = prompt("请输入换的数量")
	myContract.methods.ethToToken_huangzishun()
		.send({
			from: hzAccous[0],
			value: parseInt(number),
			gas: 1500000,
			gasPrice: '3000000'
		})
		.then(function (receipt, err) {
			if (err == undefined) {
				alert("交换成功")
			} else {
				alert("交换失败")
			}
		})
}

function overtime1() {
	var number = prompt("请输入你要添加的时间")
	myContract.methods.overtime_huangzishun(parseInt(number))
		.send({
			from: hzAccous[0],
			gas: 1500000,
			gasPrice: '3000000'
		})
		.then(function (receipt, err) {
			if (err == undefined) {
				alert("延长时间成功")
			} else {
				alert("延长时间失败")
			}
		})
}



