import Link from 'next/link';
import { forwardRef, useState, useImperativeHandle } from 'react';

const ChapterLink = forwardRef(({ onClick, href, chapter }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      {chapter.number}. {chapter.text}
    </a>
  );
});

ChapterLink.displayName = 'ChapterLink';

const FoldableSection = forwardRef(({ section }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };
  const chevronDirection = visible ? 'chevron top' : 'chevron bottom';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <li className="section">
      {section.name}
      <button onClick={toggleVisibility} className="foldButton">
        <span className={chevronDirection} />
      </button>
      <ul className="chapterList" style={showWhenVisible}>
        {section.chapters.map((chapter, i) => (
          <li key={i} className="chapter">
            <Link href={`/chapters/${chapter.number}`} passHref>
              <ChapterLink chapter={chapter} />
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
});

FoldableSection.displayName = 'FoldableSection';

export default function TableOfContents({ contents }) {
  return (
    <div className="tableOfContents">
      <h2>Table of Contents</h2>
      <ul className="sectionList">
        {contents.map((section, i) => (
          <FoldableSection key={i} section={section} />
        ))}
      </ul>
    </div>
  );
}
