export default function Search() {
  return (
    <form className="w-full md:w-auto">
      <div className="flex gap-5 rounded-xl border border-solid border-yellow-400 p-2.5 md:w-[382px]">
        <input
          type="text"
          placeholder="Busque por um filme ou série"
          className="w-full bg-transparent p-2.5 outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-yellow-400 p-2.5 text-black active:bg-gray-400"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
