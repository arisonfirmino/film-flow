"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CardContent from "../components/card-content";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { register } from "swiper/element/bundle";
register();

import SwiperContent from "../components/swiper-content";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [popular, setPopular] = useState([]);
  const [topFive, setTopFive] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=pt-BR&page=${page}`,
      )
      .then((response) => {
        const topFiveMovies = response.data.results.slice(0, 5);
        setPopular(response.data.results);
        setTopFive(topFiveMovies);
        return topFiveMovies[0]
          ? axios.get(
              `https://api.themoviedb.org/3/movie/${topFiveMovies[0].id}?api_key=${apiKey}&language=pt-BR`,
            )
          : Promise.resolve(null);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao fazer a requisição:", error);
      });
  }, [apiKey, page]);

  const loadMoreResults = (direction) => {
    if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen w-full flex-col gap-5">
      <section className="flex max-h-[500px] min-h-[500px] w-full bg-cover bg-center">
        <Swiper autoplay={{ delay: 3000 }} loop={true}>
          {topFive.map((content) => (
            <SwiperSlide key={content.id}>
              <SwiperContent content={content} apiKey={apiKey} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="grid min-h-screen w-full grid-cols-1 gap-5 p-5 md:grid-cols-3 xl:grid-cols-5">
        {popular.slice(5).map((content) => (
          <CardContent key={content.id} content={content} />
        ))}
      </section>

      <div className="flex justify-center gap-5 p-5 pt-0">
        <button
          onClick={() => loadMoreResults("prev")}
          className="rounded-full bg-yellow-400 p-2.5 text-black active:bg-gray-400"
        >
          <ArrowLeftIcon />
        </button>

        <button
          onClick={() => loadMoreResults("next")}
          className="rounded-full bg-yellow-400 p-2.5 text-black active:bg-gray-400"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </main>
  );
}
