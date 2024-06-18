import { splitStringByNormalizedWords } from "../../utils/stringCompare";
import { SimpleList } from "../Layout/SimpleList";
import { getSurahDetails } from "../Quran/QuranProvider";
import { useSurahSearch } from "../Quran/SurahPage";
import { SurahIndexItem } from "./SurahIndexItem";

export const SurahIndex = () => {
  const { words } = useSurahSearch();

  if (words.length > 0) {

    const searchResults = Array
      .from({ length: 114 })
      .map((_, i) => {
        const details = getSurahDetails(i + 1);
        const result = splitStringByNormalizedWords(details.name, words);

        return { surah: i + 1, splitResult: result };
      })
      .filter(r => r.splitResult.length > 0);

    return (
      <SimpleList title="Surah Index">
        {searchResults.map((r) => (
          <SurahIndexItem key={r.surah} {...r} />
        ))}
      </SimpleList>
    )
  }

  return (
    <SimpleList title="Surah Index">
      {Array.from({ length: 114 }).map((_, i) => (
        <SurahIndexItem key={i} surah={i + 1} />
      ))}
    </SimpleList>
  );
};
