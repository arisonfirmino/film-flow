import { VideoIcon, TvIcon, StarIcon } from "lucide-react";
import Image from "next/image";

export default function CardContent({ content }) {
  return (
    <div className="flex flex-col justify-between gap-2.5 rounded-xl bg-[#09090b] p-2.5">
      {content.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original/${content.poster_path}`}
          alt={content.title || content.name}
          height={900}
          width={600}
          className="w-full rounded-xl"
        />
      )}

      <div className="flex flex-col gap-2.5">
        <p className="overflow-hidden text-ellipsis text-nowrap text-center text-xl font-medium">
          {content.title || content.name}
        </p>

        <div className="flex justify-between px-2.5">
          {content.media_type === "movie" && (
            <p className="flex items-center gap-2">
              <VideoIcon size={16} className="text-yellow-400" />
              Filme
            </p>
          )}

          {content.media_type === "tv" && (
            <p className="flex items-center gap-2">
              <TvIcon size={16} className="text-yellow-400" />
              Série
            </p>
          )}

          <p className="flex items-center gap-2">
            <StarIcon size={16} className="fill-yellow-400 text-yellow-400" />
            {content.vote_average}
          </p>
        </div>

        <button className="w-full rounded-md bg-yellow-400 p-2.5 font-medium text-black duration-500 hover:bg-opacity-75">
          Detalhes
        </button>
      </div>
    </div>
  );
}
