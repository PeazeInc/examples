import './App.css';
import { PeazeSDK } from '@peaze-labs/sdk';
import { AlchemyProvider } from '@ethersproject/providers';
import { useState } from 'react';
import Contract from './Contract.json'
const ethers = require("ethers")

function App() {
  const peaze = new PeazeSDK({
    apiKey: 'sk_yoCYEdWORWMJWLXpOeMAVTn6FEujnyhY',
    projectId: 'proj_VV0IE37AnLOFa3ixOCoq7CGiB4m3YPtd',
  });

  const provider = new AlchemyProvider(80001, 'hvSv2k8xEA8B3Et0bDwoqbzhz7hNs7vA');

  const [signer, setSigner] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const getSigner = async () => {
    const signer = await peaze.getSigner(provider);
    setSigner(signer);
    setIsLoggedin(true);
  };

  const deposit = async () => {
    const contract = new ethers.Contract('0x1EAbE6e246a671a65059618d314D4B59D19504FB', Contract.abi, signer);
    await contract.sendTip({ value: ethers.utils.parseEther('1') });
  };

  return (
    <div className="App">
      <header className="App-header">
        {
          isLoggedin ? (
            <button onClick={deposit}>Deposit</button>
          ) : (
            <button onClick={getSigner}>Login</button>
          )
        }
      </header>
    </div>
  );
}

export default App;
