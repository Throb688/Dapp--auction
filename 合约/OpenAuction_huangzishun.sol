// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";

contract OpenAuction_huangzishun is Desc20("AD","BC") {
    
    //拍卖场管理人
    address public admin_huangzishun;
    
	//拍卖开始时间
    uint public auctionStart_huangzishun;
	
	//拍卖期限
    uint public auctionLimit_huangzishun;
	
	//拍卖受益人
    address payable beneficiary_huangzishun;

    //最高出价者
    address payable public highestBidder_huangzishun;

    //最高出价
    uint public highestBid_huangzishun;
    
    //当前拍卖品的起始价格
    uint public minValue_huangzishun;

	//拍卖开始标志
    bool public startFlg_huangzishun;
	
    //拍卖结束标志
    bool public endFlg_huangzishun;
    
    //当前拍卖序号
    uint public auctionNumber_huangzishun;
    
    //鉴赏人合集
    mapping(address=>bool) public Appreciate_huangzishun;
    
    //是否申请拍卖物品
    mapping(uint=>bool) public isGoods_huangzishun;

    //更高出价事件
    event HighBidEvt_huangzishun(address bidder, uint amount);
	
	//拍卖开始事件
    event AuctionStartEvt_huangzishun(address starter);
	
    //拍卖结束事件
    event AuctionEndedEvt_huangzishun(address winner, uint amount);

	//出价事件
    event BidEvt_huangzishun(address bidder, uint amount);
    
    //拍卖场管理人权限
    modifier onlyAdmin_huangzishun(address _admin){
        require(_admin==admin_huangzishun,"You're not in charge");
        _;
    }
    
    ////鉴赏人权限
    modifier isAppreciate_huangzishun(address appreciate){
        require(Appreciate_huangzishun[appreciate],"You are not a connoisseur!!");
        _;
    }
    
    //交易记录
    struct Deal_huangzishun{
        uint x;//拍卖品序号
        address  owner;//拍卖品拥有人
        address gainer;//拍卖品获得者
        string _goods;//物品的详情
        uint _values;//最终价格
        uint _startTime;//拍卖开始时间
        uint tradingHour;//成交时间
    }
    
    
    //物品拍卖
    struct Goods_huangzishun{
        uint actionnumber;//拍卖品序号
        address owners; //拍卖品拥有人
        uint _value; //拍卖起始价格
        string goodName;//拍卖物的名称
        string details;//物品的详情
        uint continueTime;//拍卖持续时间
        string[] imglist;
        bool isAuctionEnd;//物品是否已拍卖
        bool isExist;//物品是否还存在
        uint startTime;//拍卖开始时间
    }
    
    //申请拍卖物品集合+
     mapping(uint=>Goods_huangzishun)  goodsList_huangzishun;

     //交易数组
     Deal_huangzishun[] public dealList_huangzishun;
     
     //拍卖数组
     Goods_huangzishun[] public  actionList_huangzishun;
    
    //初始化拍卖场管理人
   constructor()  {
       admin_huangzishun = msg.sender;
       approve(address(this),balanceOf(msg.sender)/2);
       transfer(address(this),200000);
  }
	
    //进行出价
    function bidder_huangzishun() public payable {
	    emit BidEvt_huangzishun(msg.sender, msg.value);
	
        //拍卖需已经开始
        require(startFlg_huangzishun, "auction not yet start");
        
        //拍卖没结束
        require(!endFlg_huangzishun, "The auction is not over");
		 
		//最高出价者不是当前出价竞标者（即已经是最高出价者没有再次出价太高自己的最高价格）
		require(highestBidder_huangzishun != msg.sender, "You are highest bidder");
		
        //区块时间需早于拍卖期限
        require(block.timestamp <= auctionLimit_huangzishun, "auction ended");

        //出价需高于最高金额
        require(msg.value >highestBid_huangzishun, "less than highest bid");

		//拍卖开始时的最高出价金额为0
		//若不为0，代表已经有人出过价
		//应该将前一位出价者的拍卖金退还
        if (highestBid_huangzishun > minValue_huangzishun) {
        //   address(highestBidder).transfer(highestBid);
          payable(highestBidder_huangzishun).transfer(highestBid_huangzishun);
        }
		
		
		//记录新的最高出价者与金额
        highestBidder_huangzishun = payable(address(uint160(msg.sender))); 
        highestBid_huangzishun = msg.value;
         
        //发送更高出价事件
        emit HighBidEvt_huangzishun(msg.sender, msg.value);
    }

	//启动拍卖活动
	function setAuctionStart_huangzishun(uint _timeLimit) public  onlyAdmin_huangzishun(msg.sender) returns(Goods_huangzishun memory) {

        //是否为拍卖序号
        require(isGoods_huangzishun[_timeLimit],"It's not an auction number!!");
	   //前提是拍卖还没开始
       require(!startFlg_huangzishun, "auction already start");
		
	   beneficiary_huangzishun = payable(address(uint160(goodsList_huangzishun[_timeLimit].owners)));
	   auctionStart_huangzishun = block.timestamp;
	   minValue_huangzishun = goodsList_huangzishun[_timeLimit]._value;
	   goodsList_huangzishun[_timeLimit].isAuctionEnd=true;
	   goodsList_huangzishun[_timeLimit].startTime=auctionStart_huangzishun;
  
	   //设置拍卖期限	
       auctionLimit_huangzishun = block.timestamp + goodsList_huangzishun[_timeLimit].continueTime;
	   
	   //设置拍卖已开始
	   startFlg_huangzishun = true;
	   endFlg_huangzishun=false;
	   
	   //设置拍卖拍卖序号
	   auctionNumber_huangzishun=_timeLimit;
	   highestBid_huangzishun=0;
	   
	   //拍卖开始事件
	   emit AuctionStartEvt_huangzishun(msg.sender);
	   
	   return goodsList_huangzishun[_timeLimit];
    }
	
	//延长拍卖时间
	function overtime_huangzishun(uint _time) public {

	    //前提是拍卖开始
	    require(startFlg_huangzishun, "auction already start");  
	    //拍卖没有结束
	    require(block.timestamp <= auctionLimit_huangzishun, "auction not yet ended");
	    
	    auctionLimit_huangzishun +=_time;
	    goodsList_huangzishun[auctionNumber_huangzishun].continueTime+=_time;
        transfer(address(this),_time*2);
	}
	
    function ethToToken_huangzishun() public payable{
        IERC20(address(this)).transfer(msg.sender,msg.value);
    }
	
    //结束拍卖
    function setAuctionEnd_huangzishun() public {
        //区块时间需大于拍卖期限
        require(block.timestamp >= auctionLimit_huangzishun, "auction not yet ended");
        
        //拍卖需还没设置为已结束		
        require(!endFlg_huangzishun, "auction already ended");

        //设置拍卖结束
        endFlg_huangzishun = true;
        startFlg_huangzishun=false;
        emit AuctionEndedEvt_huangzishun(highestBidder_huangzishun, highestBid_huangzishun);
        
        //拍卖结束时间
         uint time_huangzishun = block.timestamp;
          remove_huangzishun(select_huangzishun(auctionNumber_huangzishun));
           
          //将该交易保存到交易数组中
        if(highestBid_huangzishun==minValue_huangzishun){//判断是否有人出价
             Deal_huangzishun memory b = Deal_huangzishun(auctionNumber_huangzishun, 
             goodsList_huangzishun[auctionNumber_huangzishun].owners,address(0),
             goodsList_huangzishun[auctionNumber_huangzishun].details,0,time_huangzishun,
             goodsList_huangzishun[auctionNumber_huangzishun].startTime);
             dealList_huangzishun.push(b);
             auctionNumber_huangzishun=0;
        }else{
              //将最高竞标金额，移交给给主持人
              beneficiary_huangzishun.transfer(highestBid_huangzishun);
              IERC20(address(this)).transfer(beneficiary_huangzishun,highestBid_huangzishun);
              Deal_huangzishun memory a = Deal_huangzishun(auctionNumber_huangzishun,
               goodsList_huangzishun[auctionNumber_huangzishun].owners,
               highestBidder_huangzishun,goodsList_huangzishun[auctionNumber_huangzishun].details,
               highestBid_huangzishun,time_huangzishun,
               goodsList_huangzishun[auctionNumber_huangzishun].startTime);
              dealList_huangzishun.push(a);
              auctionNumber_huangzishun=0;
        }
        highestBid_huangzishun=0;
    }
    
     //申请拍卖物品
   function applyAuction_huangzishun(uint _value,string memory _goodsName,
   string memory _details,string[] memory imglist,uint _continue) public returns(uint) {
       uint time1_huangzishun = block.timestamp;
       if(_continue>300){
           transfer(address(this),(_continue-300));
       }
       Goods_huangzishun memory a = Goods_huangzishun(time1_huangzishun,msg.sender,
       _value,_goodsName,_details,_continue,imglist,false,false,0);
       goodsList_huangzishun[time1_huangzishun] = Goods_huangzishun(time1_huangzishun,msg.sender,
       _value,_goodsName,_details,_continue,
       imglist,false,false,0);

       isGoods_huangzishun[time1_huangzishun] = true;
       actionList_huangzishun.push(a);
       return time1_huangzishun;
   }
   
    
    //查看当前拍卖持续时间
    function getauctionTime_huangzishun() public view returns(uint) {
        
        //拍卖已经开始
        require(!startFlg_huangzishun, "auction already start");
        
         //拍卖没有结束
	    require(block.timestamp >= auctionLimit_huangzishun, "auction not yet ended");
        
        return goodsList_huangzishun[auctionNumber_huangzishun].continueTime;
 }
    
  //查看当前时间戳
  function getBlocktimestamp_huangzishun() public view returns(uint){
      return block.timestamp;
  }
   
    
    function getActionList_huangzishun() public view returns(Goods_huangzishun[] memory) {
        return actionList_huangzishun;
    }

     function getDealList_huangzishun() public view returns(Deal_huangzishun[] memory) {
        return dealList_huangzishun;
    }
    
    function select_huangzishun(uint _ads) private view returns(uint a){
	    for(uint i=0;i<actionList_huangzishun.length;i++){
	        if(_ads == actionList_huangzishun[i].actionnumber){
	            a=i;
	            return a;
	        }
	    }
	}

     function remove_huangzishun(uint _index) public {
        require(_index < actionList_huangzishun.length, "index out of bound");

        for (uint i = _index; i < actionList_huangzishun.length - 1; i++) {
            actionList_huangzishun[i] = actionList_huangzishun[i + 1];
        }
        actionList_huangzishun.pop();
    }
	


    function getGoodlist_huangzishun(uint _Pid) public view returns(Goods_huangzishun memory){
        return goodsList_huangzishun[_Pid];
    }

    //查看该拍卖还剩多少时间
    function getBidderTime_huangzishun() public view returns(uint){
        return  auctionLimit_huangzishun - block.timestamp;
    }

}