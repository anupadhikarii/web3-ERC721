// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.9;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// https://rinkeby.etherscan.io/address/0xF45C569e3B46E7179d35B41231CAc05B5f8EfDB0#code

contract RobopunksNFT is ERC721,Ownable{

    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public maxPerWallet;
    bool public isPublicMintEnable;
    string internal baseTokenUri;
    address  payable public withdrawWallet;

    mapping(address => uint256) public walletMints;
    

    constructor() payable ERC721('RoboPunks','RP'){
        mintPrice = 0.02 ether;
        totalSupply =0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool isPublicMintEnable_) external onlyOwner{
        isPublicMintEnable = isPublicMintEnable_;

    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint tokenId_) public view override returns(string memory){
        require(_exists(tokenId_), 'Token does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_),".json"));

    }

    function withdraw() external onlyOwner{
        (bool success,) =  withdrawWallet.call{ value: address(this).balance}('');
        require(success,'withdraw failed');
    }

    function mint(uint256 quantity_)public payable{
      
        require(isPublicMintEnable,'minting is enable');
        require(msg.value == quantity_ * mintPrice,'wrong mint value');  
        require(totalSupply + quantity_ <= maxSupply, 'sold  out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet ,'exceed max wallets');

        for(uint256 i = 0; i <quantity_; i++){
            uint256 newTokenID = totalSupply +1;
            totalSupply++;
            _safeMint(msg.sender,newTokenID);
        }
        }
}