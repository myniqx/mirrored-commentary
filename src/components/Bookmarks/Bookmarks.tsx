import { SimpleList } from "../Layout/SimpleList";
import { useQuranContext } from "../Quran/QuranProvider";
import { BookmarkedItem } from "./BookmarkedItem";

export const Bookmarks = () => {
  const { bookmarks } = useQuranContext()

  if (!bookmarks) return null
  return (
    <SimpleList
      title="Bookmarks"
    >
      {bookmarks.map((b) => <BookmarkedItem key={b.id} item={b} />)}
    </SimpleList>
  )
}
