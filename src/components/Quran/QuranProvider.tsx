import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { arabic } from "../../constants/quran/arapca";
import useLocalStorage from "../../utils/useLocalStorage";
import { turkish } from "../../constants/quran/turhish";
import { endings } from "../../constants/quran/ending";
import { surah_details } from "../../constants/quran/surah";
import { BookmarkData } from "../Bookmarks/BookmarkedItem";

interface QuranContextProps {
  hasLineEnding: (sure: number, ayet: number, wordIndex: number) => boolean;
  getArabic: (sure: number, ayet: number) => string[];
  getTurkish: (sure: number, ayet: number) => string[];
  setBookmark: (page: number, id?: number) => void
  bookmarks: BookmarkData[]
}

export const QuranContext = createContext<QuranContextProps>(
  {} as QuranContextProps,
);

type QuranProviderProps = PropsWithChildren;

export const QuranProvider: React.FC<QuranProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkData[]>("bookmarks", []);
  const hasLineEnding = (sure: number, ayet: number, wordIndex: number) => {
    return endings[sure - 1]?.[ayet]?.includes(wordIndex);
  };

  const getArabic = (sure: number, ayet: number) => {
    return arabic[sure - 1][ayet - 1];
  };

  const getTurkish = (sure: number, ayet: number) => {
    return turkish[sure - 1][ayet - 1];
  };

  const setBookmark = (page: number, id?: number) => {
    const bm = id ? bookmarks.find((b) => b.id === id) : undefined;
    if (bm) {
      if (bm.page === page) {
        return
      }
      bm.page = page
      bm.last_seen = new Date().toISOString()
      setBookmarks([bm, ...bookmarks.filter((b) => b.id !== id)])
    }
    else {
      setBookmarks([{
        id: id ?? Date.now(),
        page,
        last_seen: new Date().toISOString()
      }, ...bookmarks])
    }
  }

  return (
    <QuranContext.Provider
      value={{
        hasLineEnding,
        getArabic,
        getTurkish,
        setBookmark,
        bookmarks
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuranContext = () => React.useContext(QuranContext);

export const getSurahDetails = (sure: number) => {
  const [order, isMekki, name, totalAyahs] = surah_details[sure - 1];
  return { order, isMekki, name, totalAyahs };
}

export const hasBasmala = (sure: number) => {
  return sure !== 1 && sure !== 9;
};
