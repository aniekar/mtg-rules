import { forwardRef } from "react";
import Link from "next/link";

const ChapterLink = forwardRef(({ href, chapter, selectRules }, ref) => {
  return (
    <a href={href} onClick={() => selectRules(chapter.rules)} ref={ref}>
      {chapter.name}
    </a>
  );
});

export default function TableOfContents({ rules, selectRules }) {
  return (
    <div className="flexChild">
      <h2>Table of Contents</h2>
      <ul>
        {rules.map((section, i) => (
          <li key={i}>
            {section.name}
            <ul>
              {section.chapters.map((chapter, i) => (
                <li key={i}>
                  <Link href="#" scroll={false} passHref>
                    <ChapterLink
                      chapter={chapter}
                      selectRules={selectRules}
                    />
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
