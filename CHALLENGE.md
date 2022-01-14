Before you start the assignment, install the metamask extension for google chrome.

Write a react app to interact with ERC20 tokens.

- User must be able to create an account and log in. (use firebase or similar services to store credentials)
- After the user logs in, there should be a button that connects user to the metamask.

Below are the requirements that logged in users should be able to do. If the user isn’t logged in, we should not show any kind of information below.

- On the main page, they should see how much balance they have and what’s the total supply of tokens. This information can be fetched from the ERC20 token contract.
- The initial balance for you will be 0 at start, so it’s your responsibility to get the tokens so that you can start. This can be done with the help of the `mint` function. For simplicity, `mint` is designed so that you can get as many tokens as you want.
- They should be able to transfer as many tokens as they want to anyone they want by using the `transfer` function. If they try to transfer more than they have, an error should be shown. If the transaction is successful, balances should be updated to both users(userA - who transferred, userB - who userA transferred tokens to)
- After this operation/transaction is done, balances for both users that participated in the transaction should be updated in real time without refreshing the page.
- Show the top 5 currencies in the list on the main page with their respective USD conversion values. It would also be great to show how much our ERC20 token costs, but since this is a new token, it wouldn’t make sense. Instead, alongside 5 top currencies, show Aragon ANT token and its price. For the API, use coinmarketcap’s api where you can quickly register and get an api key for your requests. For your reference, aragon ANT is this: https://coinmarketcap.com/currencies/aragon/ . NOTE prices should be checked/updated every 10 seconds.
- Start a subscription to the ERC20 contract and listen to all events that occur and display them in a simple log view.
  Deploy the project on fleek. This should automatically happen when you push new changes to the master branch.

Bonus Points:

- It would be great if the website would also show all the transfers that happened from the moment of the contract creation, it would be like showing all the transactions that ever took place. For this bonus point, you can use https://thegraph.com/ which listens to events that get emitted from the token contract and then stores the appropriate information in the database. You would need to write the graph which listens and stores this information. After this, you can use graphql to fetch all the transfers/transactions from graph.
- Write 1 unit + 1 integration or e2e test. You can choose what part to write your tests for.

In order to communicate with the token from javascript, please use https://github.com/ethers-io/ethers.js/

The ERC20 token contract is deployed on rinkeby testnet

Contract code: https://rinkeby.etherscan.io/address/0xff10E56d8C3c1567E0c80677e26EC687B4f1D8D0#code
address : 0xff10E56d8C3c1567E0c80677e26EC687B4f1D8D0
