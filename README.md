# Web3 Transact

This projeect is created from the template [Create T3 App](https://github.com/t3-oss/create-t3-app).

<img width="1438" alt="Screen Shot 2022-09-18 at 8 48 15 PM" src="https://user-images.githubusercontent.com/16950663/190935371-f2f7c5bb-b41f-4667-9079-f479803c2249.png">
<img width="1438" alt="Screen Shot 2022-09-18 at 8 48 25 PM" src="https://user-images.githubusercontent.com/16950663/190935374-c3096f29-53fc-4e7f-a525-1f6adc1bd33d.png">

## It's responsive!
<img width="811" alt="Screen Shot 2022-09-18 at 8 48 50 PM" src="https://user-images.githubusercontent.com/16950663/190935378-5849f250-876e-4007-aafd-91d11a158cf0.png">


## Provider

To create a base system of connecting with web3 with easy, we are using [Moralis](https://moralis.io/), and following the setup outlined in their documentation.
- https://docs.moralis.io/docs/sign-in-with-metamask

### Authentication Flow

The flow of how authentication works with our system is as follows:

![e773208-86aef92-authenticationflow](https://user-images.githubusercontent.com/16950663/190934327-995b1d97-4330-4e6b-947c-7b7c3a028364.gif)

1. Connect Wallet frontend sends request message to backend API
2. Backend request message API requests Moralis to generate a challenge
3. Generated challenge from Moralis gets sent back to frontend
4. User signs challenge using wallet which gets sent to backend verify API
5. Backend verify API asks Moralis to solve challenge using wallet signature
6. Moralis solves challenge with signature signed by user and generates result with wallet address in backend


## Sessions

Following the [Moralis documentation](https://docs.moralis.io/docs/sign-in-with-metamask), this app makes use of JWT tokens to maintain sessions. We can use this to perform wallet-related tasks in other pages.

## Transaction

The code in `user.tsx` also calls a transfer token transaction, which makes use of Moralis V1.

# Improvements

I am aware of the possible improvements in this app such as better mobile responsiveness, being able to switch networks, deployment, etc. However, due to some constraints, this is as far as I have developed it.
