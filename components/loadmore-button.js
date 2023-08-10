export default function NextButton({data, limit, size, setSize}) {
    if (!data || data[data.length - 1].length < limit) return null;
    return <>
        <br/>
        <button className={"bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-4 w-1/2"}
                onClick={() => setSize(size + 1)}>
            Load More
        </button>
    </>;
}