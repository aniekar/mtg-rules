import { forwardRef } from 'react';
import Link from 'next/link';

const ChapterLink = forwardRef(({ href, chapter }, ref) => {
  return (
   <a href={href}>{chapter.number}. {chapter.text}</a>
  );
});

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
                   {/* <Link href={`/${chapter.number}`} passHref>
                    <ChapterLink
                      chapter={chapter}
                    />
                  </Link> */}
                  <Link href={`/${chapter.number}`}><span>{chapter.number}. {chapter.text}</span></Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
