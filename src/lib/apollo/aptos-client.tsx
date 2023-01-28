import { ApolloClient, InMemoryCache } from "@apollo/client";

const aptosClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APTOS_DATA_URL,
    cache: new InMemoryCache(),
});

export default aptosClient;