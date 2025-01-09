import { CloseSvg, FileSvg, MenuSvg, SaveSvg, TrashSvg, UnVisibleSvg, VisibleSvg } from "./Svg";

import {marked} from "marked";
import { useEffect } from "react";
import {useState} from "react";

const defaultMarkdown = `
  # Welcome to Markdown

  Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

  ## How to use this?

  1. Write markdown in the markdown editor window
  2. See the rendered markdown in the preview window

  ### Features

  - Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
  - Name and save the document to access again later
  - Choose between Light or Dark mode depending on your preference

  > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

  #### Headings

  To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

  ##### Lists

  You can see examples of ordered and unordered lists above.

  ###### Code Blocks

  This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

  \`\`\`
  <main>
    <h1>This is a larger code block</h1>
  </main>
  \`\`\`
`;

function App() {
  // *** useStates Start ***
  const [visible, setVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [markdownData, setMarkdownData] = useState(
    [
      {
        id: crypto.randomUUID(),
        date: (new Date()).toLocaleDateString("tr-TR", {year: "numeric", month: "long", day: "numeric"}),
        title: "Welcome.md",
        content: defaultMarkdown
      },
  ]
);
  const [selectedMarkdownIndex, setSelectedMarkdownIndex] = useState(0);
  const [selectedMarkdownData, setSelectedMarkdownData] = useState(markdownData[0]);
  const [textAreaValue, setTextAreaValue] = useState(markdownData[selectedMarkdownIndex].content);
  const [editTitle, setEditTitle] = useState(false);
  // *** useStates End ***
  
  // *** TextArea Etkileşimi Start ***
  function changeTextAreaValue(e) {
    setTextAreaValue(e.target.value);
  }
  useEffect(() => {
    markdownData[selectedMarkdownIndex].content = textAreaValue;
  }, [textAreaValue])
  // *** TextArea Etkileşimi End ***
  
  // *** Dosya Başlık Düzenleme Start ***
  function onTitleEditHandle(e) {
    if (e.key === "Enter") {
      markdownData[selectedMarkdownIndex].title = e.target.value;
      setMarkdownData([...markdownData]);
      setEditTitle(false);
    }else if (e.key === "Escape") {
      setEditTitle(false);
    }
  }
  // *** Dosya Başlık Düzenleme End ***

  function changeVisible() {
    setVisible(!visible);
  }

  function changeTitleHandle() {
    setEditTitle(true)
  }

  function onSaveHandle() {
    setMarkdownData([...markdownData]);
  }

  function onTrashHandle() {
    setMarkdownData(markdownData.filter((item, index) => index !== selectedMarkdownIndex));
    if (markdownData.length === 1) {
      onNewDocHandle();
    }
  }

  function changeShowMenu() {
    setShowMenu(!showMenu);
  }
console.log(selectedMarkdownIndex)
  function onNewDocHandle() {
    const id = crypto.randomUUID();
    setMarkdownData([
      ...markdownData,
      {
        id,
        date: (new Date()).toLocaleDateString("tr-TR", {hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric"}),
        title: "untitled-document.md",
        content: ""
      }
    ]);
    setSelectedMarkdownIndex(markdownData.length);
    setShowMenu(false);
  }

  function changeSelectedMarkdownIndex(index) {
    setSelectedMarkdownIndex(index);
    setShowMenu(false);
  }

  return (
    <>
    <div className="container" style={{gridTemplateColumns: showMenu ? "350px 1fr" : "1fr"}}>
      <nav className="nav" style={{display: showMenu ? "grid" : "none"}}>
        <h1>MARKDOWN</h1>
        <h3>MY DOCUMENTS</h3>
        <button className="new-doc-btn" onClick={onNewDocHandle}>
          + New Document
        </button>
        <div className="doc-list">
          {
            markdownData.map((item, index) => (
              <button 
                key={item.id} 
                className={selectedMarkdownIndex === index ? "doc-item selected" : "doc-item"}
                onClick={() => changeSelectedMarkdownIndex(index)}
              >
                <FileSvg />
                <div className="doc-metadata">
                  <span className="doc-date">{item.date}</span>
                  <span className="doc-title">{item.title}</span>
                </div>
              </button>
            ))
          }
        </div>
      </nav>
      <div className="main-container">
        <header>
          <label className="menu-button">
            <input 
              type="checkbox"
              className="menu-checkbox"
              checked={showMenu}
              onChange={changeShowMenu}
            />
            {
              showMenu ? <CloseSvg /> : <MenuSvg />
            }
          </label>
          {
            editTitle ? (
              <input 
                type="text" 
                className="file-name-edit" 
                defaultValue={markdownData[selectedMarkdownIndex].title}
                onKeyDown={onTitleEditHandle}
                autoFocus={true}
              />
            ) : (
              <h3 className="file-name" onClick={changeTitleHandle}>
                <FileSvg />
                {
                  markdownData[selectedMarkdownIndex].title
                }
              </h3>
            )
          }
          <div className="interaction-btns">
            <button className="trash-btn" onClick={onTrashHandle}>
              <TrashSvg />
            </button>
            <button className="save-btn" onClick={onSaveHandle}>
              <SaveSvg />
            </button>
          </div>
        </header>
        <main>
          <div className="main-info">
            <span className="view-type">
            {
              visible ? "MARKDOWN" : "PREVIEW"
            }
            </span>
            <label>
              <input
                type="checkbox" 
                className="view-type-checkbox" 
                checked={visible} 
                onChange={changeVisible} 
              />
              {
                visible ? <VisibleSvg /> : <UnVisibleSvg />
              }
            </label>
          </div>
          <div className="main-content">
            {
              visible ? (
                <textarea
                  className="main-textarea"
                  placeholder="Type some markdown here..."
                  value={markdownData[selectedMarkdownIndex].content}
                  onChange={changeTextAreaValue}
                ></textarea>
              ) : (
                <div 
                  className="main-preview" 
                  dangerouslySetInnerHTML={{__html: marked(markdownData[selectedMarkdownIndex].content)}}
                />
              )
            }
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

export default App;
