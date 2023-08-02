import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sliders from "react-slick";
import {
  Artist,
  ChartSection,
  Loading,
  NewRelease,
  Section,
  Slider,
} from "../components";

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
    weekChart,
    albumHot,
    moodMeltSlowly,
    singers,
  } = useSelector((state) => state.app);

  return (
    <>
      {chill &&
      positiveEnergy &&
      remixDance &&
      top100 &&
      trendingArtist &&
      weekChart &&
      albumHot &&
      moodMeltSlowly &&
      singers ? (
        <div className="overflow-y-auto w-full">
          <div className="w-full h-[70px]"></div>
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
          <Section data={albumHot} />
          <div className="w-full h-[500px]"></div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Home;
