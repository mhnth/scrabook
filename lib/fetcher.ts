type FetchArgs = [input: RequestInfo | URL, init?: RequestInit | undefined];

const fetcher = (args: string) => fetch(args, { mode: 'no-cors' }).then((res) => res.json());

export default fetcher;
