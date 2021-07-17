import Link from 'next/link';

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
                  <Link href={`/chapters/${chapter.number}`}>
                    <span>
                      {chapter.number}. {chapter.text}
                    </span>
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
