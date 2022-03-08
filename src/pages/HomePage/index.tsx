import React, { useEffect, useState } from "react"
import "./styles.css";
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { actions, NodeWallet } from '@metaplex/js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

import CardItem from "../../components/CardItem";
import { title } from "process";
import { getIPFSData } from "../../api/getIPFSData";



let HomePage = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [dataCollection, setDataCollection] = useState([])
    useEffect(() => {
        let initLoadCollectionNft = async () => {
            // while(!publicKey);
            if (!publicKey) throw new WalletNotConnectedError();
            const nftsmetadata = await Metadata.findDataByOwner(connection, publicKey.toBase58());
            let data = []
            await Promise.all(
                nftsmetadata.map(async (item, index) => {
                    let dataIPFSJson = await getIPFSData(item.data.uri)
                    // console.log(dataIPFSJson.data)
                    data.push(dataIPFSJson.data)
                })
            )
            setDataCollection(data)
        }
        initLoadCollectionNft()

    }, [publicKey])
    return (<>
        <div className="Container">
            <div className="PanelCard">
                {dataCollection.map((item, index) => {
                    // let data = await getIPFSData(item.data.uri)
                    // console.log(item)
                    return (<CardItem key={index} imageUrl={item.image} title={item.name} />)
                })}

            </div>
        </div>

    </>)
}
export default HomePage;