import { getSession, signOut } from 'next-auth/react';
import { useWeb3Transfer } from "react-moralis";
import Moralis from 'moralis-v1';
import { GetServerSideProps } from 'next';

const ActionButtons = () => {
    const { fetch, error, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.Token(20, 18),
        receiver: "0x0000000000000000000000000000000000000000",
        type: "erc20",
        contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    });

    return (
        // Use your custom error component to show errors
        <div className="mt-5 align-items m-auto">
            <div className="mb-5 w-44 text-center m-auto">
                {error && <div>{error.message}</div>}
            </div>
            <button
                className="flex w-56 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                onClick={() => fetch()}
                disabled={isFetching}>
                Transact Token
            </button>

            <button
                className="flex mt-2 w-56 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                onClick={() => signOut({ redirect: false, callbackUrl: '/' })}
            >
                Sign Out
            </button>
        </div>
    );
};

type UserType = {
  address: string;
  profileId: string;
  signature: string;
};

// gets a prop from getServerSideProps
const User = ({ user }: { user: UserType }) => {
    const { address, profileId, signature } = user;

    return (
      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Web3 <span className="text-purple-500">Transact</span>
        </h1>

        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Web3 Explorer Info 👽
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {`Here's your verified-via-backend wallet info.`}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Wallet Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {address}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Profile Id
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {profileId}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Signature
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {signature}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div>
            <ActionButtons />
        </div>
      </main>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    
    // redirect if not authenticated
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default User;