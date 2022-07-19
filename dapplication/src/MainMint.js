import React from "react";
import { useState } from "react";
import {ethers, BigNumber} from 'ethers';
import robopunksNFT from './RobopunksNFT'
import {Box,Button ,Flex, Input, Text} from '@chakra-ui/react';

const robopunksNFTAddress = "0xF45C569e3B46E7179d35B41231CAc05B5f8EfDB0";

const MainMint = ({accounts, setAccounts}) =>{
    const [mintAmount, setmintAmount] = useState(1);

    const isConneted = Boolean(accounts[0]);
    console.log("mintamount:", mintAmount)
    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                robopunksNFTAddress,
                robopunksNFT.abi,
                signer
            );


            try{
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response:',response);
            }catch(err){
                console.log('error:', err)
            }
        }
    }


    const handleDecrement =() =>{
        if( mintAmount <= 1) return;
        setmintAmount(mintAmount -1);
    };

    const handleIncrement = () =>{
        if( mintAmount >= 3) return;
        setmintAmount(mintAmount + 1);

    };


    return (
        <Flex justify ="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000"> Robopunks</Text>

                    <Text fontSize="30px"  letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">
                        Robopunks Nft on 2022 .Can Robopunks save humans from rampant aliean?, mint robopunks to find out</Text>
            </div>
            {isConneted ?(
                <div>
                <Flex align="center" justify="center">
                    <Button 
                    background= "#D6517D"
                    borderRadius="5px"
                    boxShadow = "0px 2px 2px 1px #0F0F0F"
                    color='white'
                    cursor="pointer"
                    fontFamily="inherit"
                    padding= "15px"
                    marginTop="10px"                
                    onClick={handleDecrement}>
                        -
                    </Button>

                    <Input
                    readOnly
                    width="100px"
                    height="40px"
                    textAlign="center"
                    paddingLeft="19px"
                    marginTop="10px" 
                    type="number" 
                    value={mintAmount} />

                    <Button 
                        background= "#D6517D"
                        borderRadius="5px"
                        boxShadow = "0px 2px 2px 1px #0F0F0F"
                        color='white'
                        cursor="pointer"
                        fontFamily="inherit"
                        padding= "15px"
                        marginTop="10px"                
                        onClick={handleIncrement}>
                            +
                        </Button>
                    
                 </Flex>
                 <Button 
                        background= "#D6517D"
                        borderRadius="5px"
                        boxShadow = "0px 2px 2px 1px #0F0F0F"
                        color='white'
                        cursor="pointer"
                        fontFamily="inherit"
                        padding= "15px"
                        marginTop="10px"  
                        onClick={handleMint}> Mint Now</Button>
                </div>

            ):(
                <Text fontSize="30px"  color="#D6517D" textShadow="0 3px #000000">
                You must be connected for minting</Text>
            )
            }
            </Box>
       </Flex>
    )
}

export default MainMint;