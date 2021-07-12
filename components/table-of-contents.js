import { forwardRef } from "react";
import Link from "next/link";

const ChapterLink = forwardRef(({ href, chapter, selectChapter }, ref) => {
  return (
    <a href={href} onClick={() => selectChapter(chapter)} ref={ref}>
      {chapter}
    </a>
  );
});

export default function TableOfContents({ contents, selectChapter }) {
  return (
    <div className="tableOfContents">
      <h2>Table of Contents</h2>
      <ul>
        {contents.map((section, i) => (
          <li key={i}  className="section">
            {section.name}
            <ul className="chapterList">
              {section.chapters.map((chapter, i) => (
                <li key={i} className="chapter">
                  <Link href="#" passHref>
                    <ChapterLink chapter={chapter} selectChapter={selectChapter} />
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
