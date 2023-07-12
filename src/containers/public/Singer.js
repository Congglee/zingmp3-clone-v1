import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      const res = await apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };

    singer && fetchArtistData();
  }, [singer]);

  return (
    <div className="flex flex-col w-full relative">
      <img src={artistData?.cover} alt="background" className="mt-[-70px]" />
    </div>
  );
};

export default Singer;
