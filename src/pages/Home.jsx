import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import CategoryCard from "../components/others/homePage/CategoryCard";
import Testimonial from "../components/others/homePage/Testimonial";

export default function Home() {
  const category = [
    {
      name: "Dog",
      fetchDataName: "dog",
      img: "/dog.svg",
    },
    {
      name: "Cat",
      fetchDataName: "cat",
      img: "/cat.svg",
    },
    {
      name: "Rabbit",
      fetchDataName: "rabbit",
      img: "/rabbit.svg",
    },
    {
      name: "Bird",
      fetchDataName: "bird",
      img: "/bird.svg",
    },
  ];
  return (
    <>
      <div className="responsive">
        <div className="text-center mt-[6rem]">
          <p className="hero-title">Care and donate for pets</p>
          <p className="hero-sub-title pt-[0.88rem]">
            Looking for your pets or finding helps for your pets? One stop
            solution. <br />
            Help, adopted or donate to make better place for pets.
          </p>
        </div>

        <div className="w-full flex justify-center gap-[18dvw] items-center">
          <img
            src="/dogh1.svg"
            alt="pic"
            className="mt-[-3rem] sm:hidden lg:block"
          />
          <Link to={"/register"}>
            <div className=" sm:mt-[6rem] lg:mt-[3rem]">
              <Button name={"Register now"} />
            </div>
          </Link>
          <img
            src="/dogh2.svg"
            alt="pic"
            className="mt-[-3rem] sm:hidden lg:block"
          />
        </div>

        {/* category section */}

        <div className="w-full flex justify-center items-center flex-col mt-[7rem]">
          <p className="hero-title" style={{ fontSize: "2.375rem" }}>
            Select <span className="text-[#2A56A2]"> Category</span>
          </p>

          <div className="w-full flex gap-[1.12rem] flex-wrap justify-center items-center py-[2.66rem] px-[1.31rem] bg-white rounded-[2.0625rem]">
            {category.map((data, index) => (
              <div key={index}>
                <CategoryCard
                  name={data.name}
                  fetchDataName={data.fetchDataName}
                  img={data.img}
                />
              </div>
            ))}
          </div>
        </div>

        {/* call to acton section */}

        <p className="hero-title text-center mt-[7rem]">
          Make a <span className="text-[#2A56A2]"> better life</span>
        </p>
        <p className="hero-sub-title">
          Adopted animal pet to help them to get better life. Your <br /> one
          step could save one life.
        </p>

        <div className="mt-10 rounded-3xl text-white w-full gg flex flex-col justify-center items-center p-[5rem] ">
          <p className="hero-sub-title mt-4" style={{ color: "white" }}>
            Rescuing one pet may not change the world, but for that one pet,
            their <br /> world is forever changed. Open your heart, adopt a
            friend, and <br /> together, let's create a lifetime of love and
            joy.
          </p>
        </div>

        {/* about us */}

        <div className="text-center mt-[7rem]">
          <p className="hero-title" style={{ fontSize: "2.375rem" }}>
            About <span className="text-[#2A56A2]"> Us</span>
          </p>

          <p className="hero-sub-title mt-7">
            At Pwefact, we're not just a website; we're a compassionate
            community on a mission to unite tails and hearts. Discover the joy
            of adoption, make a meaningful donation, or rally support to find a
            loving home for your pet. Our platform is dedicated to saving and
            improving the lives of our furry friends. Join us in creating a
            better life for every paw.
          </p>
        </div>

        <Testimonial />

        <div>
          <section className="text-black ">
            <div className=" flex flex-col justify-center p-4 mx-auto md:p-8">
              <p className="p-2 text-sm font-medium tracki text-center uppercase cabin">
                How it works
              </p>
              <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl balboo">
                Frequently Asked{" "}
                <span className="text-[#2A56A2]">Questions</span>
              </h2>
              <div className="cabin flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
                <details>
                  <summary className="py-2 outline-none cursor-pointer focus:underline cabin">
                    What is the purpose of this site?
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="cabin">
                      This is a non profit organization where any can get help
                      for their pet from others
                    </p>
                  </div>
                </details>
                <details>
                  <summary className="py-2 outline-none cursor-pointer focus:underline cabin">
                    If i want than can i get refun?
                  </summary>
                  <div className="px-4 pb-4">
                    <p>Yes. </p>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
