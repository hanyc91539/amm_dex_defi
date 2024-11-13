"use client"
import { title, subtitle } from "@/components/primitives";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Badge } from "@nextui-org/react";
import React, { useState } from "react"

import { walletConfig } from "@/config/wallets";

import metamaskSDK from "@web3-onboard/metamask"
import Onboard from '@web3-onboard/core'

const INFURA_ID = '4716a140195c4cabb1418e2ac2f6573d'

const chains = [
  {
    id: 1,
    token: 'SepoliaETH',
    label: 'Ethereum Sepolia',
    rpcUrl: 'https://sepolia.infura.io/v3/4716a140195c4cabb1418e2ac2f6573d'
  },
]

const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: "Example Web3-Onboard Dapp",
    },
  },
})

const onboard = Onboard({
  chains: chains,
  wallets: [
    metamaskSDKWallet,
  ],
})

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [invisible, setInvisible] = useState(false);

  const [walletAddress, setWalletAddress] = useState("No");

  const connectWithWallets = async () => {
    const connectedWallets = await onboard.connectWallet();
    console.log(connectedWallets);
    setWalletAddress(connectedWallets[0].accounts[0].address)
    return connectedWallets;
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title({ color: "violet" })}>AMM-DEX-DeFi&nbsp;</span>
          <span className={title()}>Platform</span>
        </div>
      </section>
      {/* <Button onPress={onOpen}>Connect with Wallet</Button> */}
      <Button onPress={connectWithWallets}>Connect with Wallet</Button>
      <div>{walletAddress}</div>
    </>
  );
}
