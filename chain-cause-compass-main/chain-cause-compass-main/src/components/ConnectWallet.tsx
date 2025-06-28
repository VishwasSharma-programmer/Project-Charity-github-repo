import React, { useState } from 'react';

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnected(true);
        setAccount(accounts[0]);
        alert('✅ Wallet connected successfully!');
      } catch (err) {
        alert('❌ Wallet connection failed!');
      }
    } else {
      alert('🦊 Please install Metamask to connect your wallet.');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={connectWallet} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        {connected ? 'Connected 🔗' : 'Connect Wallet'}
      </button>
      {connected && <p className="text-green-500 text-sm">Wallet: {account.slice(0, 6)}...{account.slice(-4)}</p>}
    </div>
  );
};

export default ConnectWallet;