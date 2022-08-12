import AdminHook from "../components/layouts/admin.hook";

const Home = () => {
    return (
        <div>
            <AdminHook title={"Dashboard"}></AdminHook>
        </div>
    )
}

export async function getStaticProps(context) {
    return { props: { isHome: true } };
}

export default Home
