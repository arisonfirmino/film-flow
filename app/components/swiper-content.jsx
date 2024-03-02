"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { PlayIcon, VideoIcon, TvIcon, DotIcon } from "lucide-react";
import Image from "next/image";

export default function SwiperContent({ content, apiKey }) {
  const [genres, setGenres] = useState([]);
  const [duration, setDuration] = useState(null);
  const [director, setDirector] = useState(null);
  const [writer, setWriter] = useState(null);

  useEffect(() => {
    if (content.media_type === "movie" || content.media_type === "tv") {
      axios
        .get(
          `https://api.themoviedb.org/3/${content.media_type}/${content.id}?api_key=${apiKey}&language=pt-BR&append_to_response=credits,videos`,
        )
        .then((response) => {
          setDuration(response.data.runtime);
          const directorInfo = response.data.credits.crew.find(
            (person) => person.job === "Director",
          );
          if (directorInfo) {
            setDirector(directorInfo.name);
          } else {
            setDirector("Informação do diretor não disponível");
          }
          const writerInfo = response.data.credits.crew.find(
            (person) => person.job === "Writer" || person.job === "Screenplay",
          );
          if (writerInfo) {
            setWriter(writerInfo.name);
          } else {
            setWriter("Informação do roteirista não disponível");
          }
          if (response.data.genres) {
            setGenres(response.data.genres.map((genre) => genre.name));
          }
        })
        .catch((error) => {
          console.error("Erro ao obter informações do filme:", error);
        });
    }
  }, [content, apiKey]);

  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: content.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${content.backdrop_path})`
          : "none",
      }}
    >
      {content.poster_path && (
        <div className="flex h-full w-full items-center bg-[#09090b] bg-opacity-75 p-5">
          <div className="flex gap-20">
            <Image
              src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
              alt={content.title || content.name}
              height={900}
              width={600}
              className="hidden w-72 rounded-xl md:flex"
            />

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <h3 className="text-4xl font-medium">
                  {content.title || content.name}
                </h3>

                <div className="hidden flex-col text-lg md:flex">
                  {content.media_type === "movie" && (
                    <p className="flex items-center gap-2">
                      <VideoIcon size={18} className="text-yellow-400" />
                      Filme <DotIcon /> {genres.join(", ")} <DotIcon />{" "}
                      {duration}min
                    </p>
                  )}

                  {content.media_type === "tv" && (
                    <p className="flex items-center gap-2">
                      <TvIcon size={18} className="text-yellow-400" />
                      Série <DotIcon /> {genres.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 md:pr-10">
                <h3 className="text-2xl font-medium">Sinopse</h3>
                <p className="text-lg">{content.overview}</p>
              </div>

              <div>
                <button className="flex items-center gap-2 rounded-xl bg-yellow-400 px-10 py-2.5 text-lg text-black duration-500 hover:bg-opacity-75">
                  <PlayIcon size={18} />
                  Trailer
                </button>
              </div>

              {content.media_type === "movie" && (
                <div className="flex items-center gap-20">
                  <div className="flex flex-col">
                    <p className="text-lg font-medium">{director}</p>
                    <p className="font-light">Diretor</p>
                  </div>

                  <div className="flex flex-col">
                    <p className="text-lg font-medium">{writer}</p>
                    <p className="font-light">Roteiro</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
