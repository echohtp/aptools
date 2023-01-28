import { ApolloClient, InMemoryCache } from "@apollo/client";

const holaplexClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_HOLAPLEX_DATA_URL,
    cache: new InMemoryCache(),
});

export default holaplexClient;