import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Slider,
  Section,
  NewRelease,
  ChartSection,
  Artist,
} from "../../components";
import { Link } from "react-router-dom";
import Sliders from "react-slick";

const Home = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
  };
  const {
    chill,
    positiveEnergy,
    remixDance,
    top100,
    trendingArtist,
    newMusic,
    weekChart,
    albumHot,
    moodMeltSlowly,
    singers,
  } = useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section data={chill} />
      <Section data={positiveEnergy} />
      <Section data={remixDance} />
      {moodMeltSlowly && <Section data={moodMeltSlowly} />}
      <NewRelease />

      <ChartSection />
      <div className="flex items-center px-[43px] w-full mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item?.link?.split(".")[0]}
            key={item.link}
            className="flex-1 px-4"
          >
            <img
              src={item.cover}
              alt="cover"
              className="w-full object-cover rounded-md"
            />
          </Link>
        ))}
      </div>

      {singers && (
        <div className="px-[43px] w-full mt-12">
          <Sliders {...settings}>
            {singers?.map((item) => (
              <div key={item.album.artists[0].id} className="px-4">
                <Artist
                  image={item.album.artists[0].thumbnail}
                  follower={item.album.artists[0].totalFollow}
                  link={item.album.artists[0].link}
                  title={item.album.artists[0].name}
                />
              </div>
            ))}
          </Sliders>
        </div>
      )}

      <Section data={top100} />
      <Section data={trendingArtist} />
      {/* <Section data={newMusic} /> */}

      <Section data={albumHot} />

      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Home;
