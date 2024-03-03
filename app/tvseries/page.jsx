"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import CardContent from "../components/card-content";

export default function TvSeries() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const [tvSeries, setTvSeries] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=pt-BR&page=${page}`,
      )
      .then((response) => {
        setTvSeries(response.data.results);
        console.log(response.data.results);
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
      <section className="grid min-h-screen w-full grid-cols-1 gap-5 p-5 md:grid-cols-3 xl:grid-cols-5">
        {tvSeries.map((content) => (
          <CardContent key={content.id} content={content} apiKey={apiKey} />
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
