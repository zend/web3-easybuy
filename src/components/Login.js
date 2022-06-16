import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Link, List, ListItem, ListItemText } from "@mui/material";

export default function Login() {
  const [dialogShow, setDialogShow] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const [chain, setChain] = React.useState('');
  
  const eth = window.ethereum;

  // Try to load accounts
  const connectAccount = (event) => {
    eth.request({ method: 'eth_requestAccounts' }).then(arr => {
      setAccounts(arr)
    })
  }
  
  React.useEffect(() => {
    console.log('useEffect: requesting accounts and chainId', accounts, chain)
    eth.request({ method: 'eth_accounts' }).then(arr => {
      setAccounts(arr)
    });
    
    eth.request({ method: 'eth_chainId' }).then(chainId => {
      const map = {
        '0x1': 'Ethereum Main Network (Mainnet)',
        '0x3': 'Ropsten Test Network',
        '0x4': 'Rinkeby Test Network',
        '0x5': 'Goerli Test Network',
        '0x2a': 'Kovan Test Network',
      };
      console.log('After request', chainId);
      setChain(map[chainId] ? map[chainId] : `Unknown Network ${chainId}`)
    })
  }, [eth.request]);

  const isMetaMask = eth && eth.isMetaMask;
  if (!isMetaMask) return (
    <Link color="inherit" href='https://metamask.io/download/'>请安装MetaMask</Link>
  );
  if (accounts.length === 0) {
    return (
      <Button color="inherit" onClick={connectAccount}>Connect Wallet</Button>
    )
  }
  return (
    <React.Fragment>
      <Button color="inherit"
      sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 100, textTransform: 'none' }}
      onClick={() => setDialogShow(true)}>{accounts[0].substring(0, 10)}</Button>
      <Dialog open={dialogShow} onClose={() => setDialogShow(false)}>
        <DialogTitle>Connect Wallet Accounts</DialogTitle>
        <DialogContent>
          <List component='nav'>
            {accounts.map(acc => (
              <ListItem key={acc}>
                <ListItemText sx={{ wordBreak: 'break-all' }} 
                  primary={acc} secondary={chain} />
              </ListItem>
            ))}
            
          </List>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}