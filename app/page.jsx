import Feed from "@/components/Feed";

const Home = () => (
  <section className="w-full flex-center flex flex-col">
    <h1 className="head_text ice_gradient text-center">Weather App</h1>
    <p className="desc text-center">
      Weather app build by latest version Next Js 13
    </p>

    <Feed />
  </section>
);

export default Home;
