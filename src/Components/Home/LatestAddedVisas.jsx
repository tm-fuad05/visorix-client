import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaFlag } from "react-icons/fa";
import { RxBorderSolid } from "react-icons/rx";
import { Link } from "react-router-dom";
import VisaCard from "../AllVisaCard/VisaCard";

const LatestAddedVisas = () => {
  const [latestVisas, setLatestVisas] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://assignment-10-server-five-rose.vercel.app/latest-added-visas",
      )
      .then((res) => setLatestVisas(res.data));
  }, []);

  return (
    <div className="my-24 w-11/12 max-w-7xl mx-auto">
      <section className="flex flex-col justify-center items-center my-10 w-10/12 mx-auto ">
        <h2 className="text-2xl lg:text-4xl font-bold ">Latest Added Visas</h2>
        <RxBorderSolid className="text-5xl text-blue-600" />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestVisas.map((visaCard) => (
          <VisaCard key={visaCard._id} visaCard={visaCard} />
        ))}
      </section>
      <div className="my-10 w-fit mx-auto border-2 border-blue-400 rounded-lg p-0.5 hover:scale-105">
        <Link
          to="/all-visas"
          className="btn btn-sm md:btn-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500  text-white"
        >
          See All Visas
        </Link>
      </div>
    </div>
  );
};

export default LatestAddedVisas;
