import React, { useEffect, useState } from 'react';
import "./styles.css"
import ButtonLite from "../../components/ButtonLite"
import { actions, NodeWallet } from '@metaplex/js';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { pintaJSONToIPFS } from '../../api/pintaJSONToIPFS';
import { pintaFILEToIPFS } from '../../api/pintaFILEToIPFS';
import { nftCreateDataMeta } from '../../utils/nftCreateDataMeta';

const API_Key = "d09cb4d1776272159f10"
const API_Secret = "6059fa8794fb7d3c3e38d693f1b0a6322f5ceace78f8bc5553035940a8ca0247"

const CreateNftPage = () => {
    const { connection } = useConnection();
    const walletContext = useWallet();
    const anchorWallet = useAnchorWallet();
    const { publicKey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0)
    const [stateCreateNft, setStateCreateNft] = useState("Create NFT Now")
    const [dataMeta, setDataMeta] = useState({
        name: "",
        symbol: "",
        description: "",
        seller_fee_basis_points: "",
        image: "",
        external_url: "",
        collection_name: "",
        collection_family: "",
        attributes: "",
        properties: "",
        category: "image",
        creator: ""
    })
    useEffect(() => {
        let initBalance = async () => {
            if (!publicKey) throw new WalletNotConnectedError();
            let balance = await connection.getBalance(publicKey);
            setBalance(balance)
            setDataMeta({ ...dataMeta, creator: publicKey.toBase58() })
        }
        initBalance();
        console.log(dataMeta)
    }, [publicKey, connection])
    async function createNft() {
        setStateCreateNft("Please Wait - Upload IPFS")
        let metaData = nftCreateDataMeta({ ...dataMeta })
        let data = await pintaJSONToIPFS(API_Key, API_Secret, metaData)
        let IpfsHash = data.data.IpfsHash
        let urlIpfsHash = `https://cloudflare-ipfs.com/ipfs/${IpfsHash}`
        console.log(urlIpfsHash)

        // const keypair = Keypair.generate();
        // let seed = Uint8Array.from([117, 249, 243, 166, 139, 218, 65, 110, 155, 6, 148, 200, 35, 245, 121, 40, 200, 214, 111, 68, 10, 143, 235, 95, 242, 84, 250, 47, 83, 54, 71, 242, 74, 125, 247, 79, 116, 202, 67, 251, 13, 102, 241, 19, 36, 30, 89, 152, 129, 161, 114, 132, 95, 33, 45, 34, 57, 180, 98, 91, 9, 225, 6, 20]);
        // let keypair = Keypair.fromSecretKey(seed);

        if (!anchorWallet) {
            console.log("None wallet")
            return
        };
        setStateCreateNft("Please Wait - Mint NFT")
        const mintNFTResponse = await actions.mintNFT({
            connection,
            wallet: anchorWallet,
            uri: urlIpfsHash,
            maxSupply: 100
        });
        console.log(mintNFTResponse)
        alert(`Create NFT success, check at : https://solscan.io/token/${mintNFTResponse.mint.toBase58()}?cluster=devnet`); // token mint
        setStateCreateNft("Success Create More")
        // console.log(mintNFTResponse.mint.toBase58()); // token mint
        // console.log(mintNFTResponse.metadata.toBase58()); // address metadata
        // console.log(mintNFTResponse.edition.toBase58()); // address edition

        // console.log(mintNFTResponse.txId)
        // let res = await connection.confirmTransaction(mintNFTResponse.txId, 'processed');

    }
    return (
        <div className="NftFormCreate">
            <h1>Your balance {balance / 10 ** 9} SOL</h1>
            <h1>Create your nft</h1>
            <input type="text" name="name" onChange={(even) => {
                setDataMeta({ ...dataMeta, name: even.target.value })
            }} placeholder="name" />
            <input type="text" name="symbol" onChange={(even) => {
                setDataMeta({ ...dataMeta, symbol: even.target.value })
            }} placeholder="symbol" />
            <input type="text" name="description" onChange={(even) => {
                setDataMeta({ ...dataMeta, description: even.target.value })
            }} placeholder="description" />
            <input type="number" name="seller fee basis points" value={500} onChange={(even) => {
                setDataMeta({ ...dataMeta, seller_fee_basis_points: even.target.value })
            }} placeholder="seller fee basis points fee*100" />
            <input type="file" name="image" onChange={async (even) => {
                // console.log(even.target.files[0])
                let data = await pintaFILEToIPFS(API_Key, API_Secret, even.target.files[0])
                let IpfsHash = `https://cloudflare-ipfs.com/ipfs/${data.data.IpfsHash}`
                alert("File was upload,Check at : " + IpfsHash)
                setDataMeta({ ...dataMeta, image: IpfsHash })
            }} placeholder="image" />
            <img src={dataMeta.image} alt="" />
            <input type="text" name="external url" onChange={(even) => {
                setDataMeta({ ...dataMeta, external_url: even.target.value })
            }} placeholder="external url" />
            <input type="text" name="name" onChange={(even) => {
                setDataMeta({ ...dataMeta, collection_name: even.target.value })
            }} placeholder="collection name" />
            <input type="text" name="collection family" onChange={(even) => {
                setDataMeta({ ...dataMeta, collection_family: even.target.value })
            }} placeholder="collection family" />
            <input type="file" name="files" onChange={async (even) => {
                // console.log(even.target.files[0])
                let data = await pintaFILEToIPFS(API_Key, API_Secret, even.target.files[0])
                let IpfsHash = `https://cloudflare-ipfs.com/ipfs/${data.data.IpfsHash}`
                alert("File was upload,Check at : " + IpfsHash)
                setDataMeta({ ...dataMeta, properties: IpfsHash })
            }} placeholder="files" />
            <img src={dataMeta.properties} alt="" />
            <select value={dataMeta.category} onChange={(even) => {
                console.log(even.target.value)
                setDataMeta({ ...dataMeta, category: even.target.value })
            }}>
                <option value="image">image</option>
                <option value="video">video</option>
                <option value="audio">audio</option>
                <option value="vr">vr</option>
                <option value="html">html</option>
            </select>

            {/* <input type="text" name="category" onChange={(even) => {
                setDataMeta({ ...dataMeta, category: even.target.value })
            }} placeholder="category" /> */}
            <ButtonLite name={stateCreateNft} onClick={createNft} />
        </div>
    )
}
export default CreateNftPage;