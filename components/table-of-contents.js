import Link from 'next/link';
import { forwardRef } from 'react';

const ChapterLink = forwardRef(({ onClick, href, chapter }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {chapter.number}. {chapter.text}
    </a>
  );
});

ChapterLink.displayName = 'ChapterLink';

export default function TableOfContents({ contents }) {
  return (
    <div className="tableOfContents">
      <h2>Table of Contents</h2>
      <ul>
        {contents.map((section, i) => (
          <li key={i} className="section">
            {section.name}
            <ul className="chapterList">
              {section.chapters.map((chapter, i) => (
                <li key={i} className="chapter">
                  <Link href={`/chapters/${chapter.number}`} passHref>
                    <ChapterLink chapter={chapter} />
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
