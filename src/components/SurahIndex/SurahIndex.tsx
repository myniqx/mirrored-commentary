import { SimpleList } from "../Layout/SimpleList"
import { SurahIndexItem } from "./SurahIndexItem"



export const SurahIndex = () => {

  return (
    <SimpleList
      title="Surah Index"
    >
      {Array.from({ length: 114 }).map((_, i) => (
        <SurahIndexItem key={i} surah={i + 1} />
      ))}
    </SimpleList>
  )
}
