import { useState, useEffect } from "react";
import Web3 from 'web3';
import TestToken from '../abis/TestToken.json';
import TokenStaking from '../abis/TokenStaking.json';




export const Header = (props) => {



  useEffect(() => {
    //connecting to ethereum blockchain
    const ethEnabled = async () => {
      fetchDataFromBlockchain();
    };

    ethEnabled();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    //loadBlockchainData();
  }
  loadWeb3();



  const [inputValue, setInputValue] = useState('');
  const [testTokenContract, setTestTokenContract] = useState('');
  const [tokenStakingContract, setTokenStakingContract] = useState('');
  const [account, setAccount] = useState('Connecting to Metamask..');
  const [page, setPage] = useState(1);

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setInputValue(event.target.value);
    // inputHandler(event.target.value);
  };


  const web3 = new Web3("https://goerli.infura.io/v3/07b0f2fe4e234ceea0ff428f0d25326e");

  const contractAddress = "0x647d46ddbe022d428a8f2abe1a1925ef193861ee";
  const Address = "0x69C78cAFA39a8141a17B1D3b6954DDA05195a7DE";


  const fetchDataFromBlockchain = async () => {
    if (window.ethereum) {
      // await window.ethereum.send('eth_requestAccounts');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);

      //connecting to metamask
      let web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const testToken = new web3.eth.Contract(
        TestToken.abi,
        contractAddress
      );
      setTestTokenContract(testToken);

      const tokenStaking = new web3.eth.Contract(
        TokenStaking.abi,
        Address
      );
      setTokenStakingContract(tokenStaking);

    }

  }



  const stakeHandler = () => {

    let convertToWei = window.web3.utils.toWei(inputValue, 'Ether');

    //aproving tokens for spending
    testTokenContract.methods
      .approve(tokenStakingContract._address, convertToWei)
      .send({ from: account })

    if (page === 1) {
      tokenStakingContract.methods
        .stakeTokens(convertToWei)
        .send({ from: account })
    } else if (page === 2) {
      tokenStakingContract.methods
        .customStaking(convertToWei)
        .send({ from: account })

    }
    setInputValue('');
  }


  const UnstakeHandler = () => {

    //aproving tokens for spending


    if (page === 1) {
      tokenStakingContract.methods
        .unstakeTokens()
        .send({ from: account })
    } else if (page === 2) {
      tokenStakingContract.methods
        .customUnstake()
        .send({ from: account })

    }
    setInputValue('');
  }

  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <input style={{ height: 50, position: "absolute", top: 600, width: 350, left: 210, borderRadius: 8, textAlign: "center", border: "none" }}

                  type="number"
                  min="0"
                  step="1"
                  onChange={inputChangeHandler}
                  value={inputValue}
                ></input>

                <a
                  onClick={stakeHandler}
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Stake
                </a>{' '}
                <a
                  onClick={UnstakeHandler}
                  className='btn btn-custom btn-lg page-scroll'
                >
                  UnStake
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header >
  )
}
