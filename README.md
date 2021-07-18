# Magic: The Gathering Rulebook

A Next.js app done based on Reaktor's fall 2021 assignment brief for junior devs. The task was to build an interactive, hyperlinked rulebook application for Magic: The Gathering. The app can be accessed at [http://mtg-rules.vercel.app](http://mtg-rules.vercel.app).

## Requirements

- Fetch the [rules](https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt) and parse them programmatically
- Have a web frontend
- Include a Table of Contents with hyperlinks to chapters containing game rules
- Display the selected chapter beside the Table of Contents, containing all rules in that chapter
- Include a search box for filtering the rules displayed on the page
- Ignore any other sections in the input file, except for the actual numbered rules.

## About the solution 

The solution utilizes the static site generation features of Next.js which provides a smooth and fast user experience. However, if the rules change the site would have to be built again. Another option would be to enable a periodical revalidation of the data, but currently this is set to false (my assumption is that these rules do not change that often). 

The styling of the app could still be greatly improved, but as that was not the main focus of the assignment I decided not to spend too much time on that. 

The chevrons used in the foldable menu sections were modified from [https://codepen.io/stepher/pen/yLOaEOP](https://codepen.io/stepher/pen/yLOaEOP).
