import {generateFeedXml} from "../../components/rss";

export const getServerSideProps = async ({res}) => {
    const xml = await generateFeedXml();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/xml');
    res.end(xml);
    return {
        props: {},
    };
};

const Page = () => null;
export default Page;