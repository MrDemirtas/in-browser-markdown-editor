import { CloseSvg, FileSvg, MenuSvg, MoonSvg, SaveSvg, SunSvg, TrashSvg, UnVisibleSvg, VisibleSvg } from "./Svg";
import { useEffect, useRef, useState } from "react";

import { marked } from "marked";

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
  const dialogRef = useRef(null);
  const textAreaRef  = useRef(null);
  const previewRef = useRef(null);

  // *** useState Start ***
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);
  const [visible, setVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [markdownData, setMarkdownData] = useState(
    localStorage.getItem("markdownData")
      ? JSON.parse(localStorage.getItem("markdownData"))
      : [
          {
            id: crypto.randomUUID(),
            date: new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }),
            title: "Welcome.md",
            content: defaultMarkdown,
          },
        ]
  );
  const [selectedMarkdownData, setSelectedMarkdownData] = useState(markdownData[markdownData.length - 1]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [changeDocId, setChangeDocId] = useState("");
  // *** useState End ***

  // *** useEffect Start ***
  useEffect(() => {
    if (changeDocId === "") return;
    const newMarkdownData = markdownData.find((item) => item.id === changeDocId);
    setSelectedMarkdownData(newMarkdownData);
  }, [changeDocId]);

  useEffect(() => {
    if (selectedMarkdownData === "") return;
    setTextAreaValue(selectedMarkdownData.content); // * selectedMarkdownData state her değiştiğinde textAreaValue state'i değişerek textArea içeriği güncellenecek
  }, [selectedMarkdownData]);

  useEffect(() => {
    localStorage.setItem("markdownData", JSON.stringify(markdownData)); // * markdownData state her değiştiğinde localStorage güncellenecek
    }, [markdownData]);

    useEffect(() => {
      if (darkMode) {
        document.body.classList.add("dark-mode");
      }else {
        document.body.removeAttribute("class");
      }
    }, [darkMode]);
  // *** useEffect End ***

  // *** TextArea Etkileşimi Start ***
  function changeTextAreaValue(e) {
    setTextAreaValue(e.target.value);
  }
  // *** TextArea Etkileşimi End ***

  // *** Dosya Başlık Düzenleme Start ***
  function onTitleEditHandle(e) {
    if (e.key === "Enter") {
      selectedMarkdownData.title = e.target.value;
      setMarkdownData([...markdownData]);
      setEditTitle(false);
    } else if (e.key === "Escape") {
      setEditTitle(false);
    }
  }
  // *** Dosya Başlık Düzenleme End ***

  // *** Silme İşlemi Start ***
  function onTrashHandle() {
    dialogRef.current.showModal();
  }
  function onConfirmDeleteHandle() {
    const newMarkdownData = markdownData.filter((item) => item.id !== selectedMarkdownData.id);
    setMarkdownData(newMarkdownData);
    if (newMarkdownData.length !== 0) {
      setSelectedMarkdownData(newMarkdownData[newMarkdownData.length - 1]);
    } else {
      onNewDocHandle();
    }
    dialogRef.current.close();
  }
  //* Silme İşlemi End ***

  // *** Yeni Dosya Oluşturma Start ***
  function onNewDocHandle() {
    const id = crypto.randomUUID();
    const options = {
      id,
      date: new Date().toLocaleDateString("tr-TR", { hour: "numeric", minute: "numeric", second: "numeric", year: "numeric", month: "long", day: "numeric" }),
      title: "untitled-document.md",
      content: "",
    };
    setMarkdownData((prev) => {
      if (prev.length === 0) {
        return [options];
      } else {
        return [...markdownData, options];
      }
    });
    setChangeDocId(id);
    setShowMenu(false);
  }
  // *** Yeni Dosya Oluşturma End ***

  function changeSelectedMarkdownId(id) {
    setChangeDocId(id); // * changeDocId state'i değiştiğinde useEffect çalışacak (Satır: 63-68)
  }

  function changeVisible() {
    setVisible(!visible);
  }

  function changeTitleHandle() {
    setEditTitle(true);
  }

  function onSaveHandle() {
    selectedMarkdownData.content = textAreaValue;
    setMarkdownData([...markdownData]);
    localStorage.setItem("markdownData", JSON.stringify([...markdownData]));
  }

  function changeShowMenu() {
    setShowMenu(!showMenu);
  }

  function changeDarkMode() {
    const currentDarkMode = !darkMode;
    setDarkMode(currentDarkMode);
    localStorage.setItem("darkMode", currentDarkMode);
  }

  return (
    <>
      <div className="container" style={{ gridTemplateColumns: showMenu ? "300px 1fr" : "1fr" }}>
        <nav className="nav" style={{ display: showMenu ? "grid" : "none" }}>
          <h1>MARKDOWN</h1>
          <h3>MY DOCUMENTS</h3>
          <button className="new-doc-btn" onClick={onNewDocHandle}>
            + New Document
          </button>
          <div className="doc-list">
            {markdownData.map((item) => (
              <button key={item.id} className={selectedMarkdownData.id === item.id ? "doc-item selected" : "doc-item"} onClick={() => changeSelectedMarkdownId(item.id)}>
                <FileSvg />
                <div className="doc-metadata">
                  <span className="doc-date">{item.date}</span>
                  <span className="doc-title">{item.title}</span>
                </div>
              </button>
            ))}
          </div>
          <label className="theme-switch">
            <SunSvg fillColor={!darkMode ? "#fff" : "#5A6069"} />
            <input className="switch" type="checkbox" checked={darkMode} onChange={changeDarkMode} />
            <MoonSvg fillColor={darkMode ? "#fff" : "#5A6069"} />
          </label>
        </nav>
        <div className="main-container">
          <header>
            <label className="menu-button">
              <input type="checkbox" className="menu-checkbox" checked={showMenu} onChange={changeShowMenu} />
              {showMenu ? <CloseSvg /> : <MenuSvg />}
            </label>
            <div className="doc-title">
              <h1 className="desktop-title">MARKDOWN</h1>
              <FileSvg />
              {editTitle ? (
                <div className="file-name-edit">
                  <span>Document Name</span>
                  <input type="text" className="file-name-edit-input" defaultValue={selectedMarkdownData.title} onKeyDown={onTitleEditHandle} autoFocus={true} />
                </div>
              ) : (
                <div className="file-name-edit">
                  <span className="tablet" >Document Name</span>
                  <h3 className="file-name" onClick={changeTitleHandle}>
                    {selectedMarkdownData.title}
                  </h3>
                </div>
              )}
            </div>
            <div className="interaction-btns">
              <button className="trash-btn" onClick={onTrashHandle}>
                <TrashSvg />
              </button>

              <button className="save-btn" onClick={onSaveHandle} disabled={textAreaValue === selectedMarkdownData.content}>
                <SaveSvg />
                <span className="tablet">Save Changes</span>
              </button>
            </div>
          </header>
          <main>
            <div className={"main-content " + (visible ? "edit" : "preview")}>
              <label className="view-type-label">
                <input type="checkbox" className="view-type-checkbox" checked={visible} onChange={changeVisible} />
                  {visible ? <VisibleSvg /> : <UnVisibleSvg />}
              </label>
              <div className="main-edit">
                <div className="main-info">
                  <span className="view-type">MARKDOWN</span>
                </div>
                <textarea 
                  ref={textAreaRef}
                  className="main-textarea" 
                  placeholder="Type some markdown here..." 
                  value={textAreaValue} 
                  onChange={changeTextAreaValue}
                ></textarea>
              </div>
              <div className="main-preview">
                <div className="main-info">
                  <span className="view-type">PREVIEW</span>
                </div>
                <div ref={previewRef} className={"main-preview-content"} dangerouslySetInnerHTML={{ __html: marked(textAreaValue) }} />
              </div>
            </div>
          </main>
        </div>
        <DeleteDialog dialogRef={dialogRef} onConfirmDeleteHandle={onConfirmDeleteHandle} />
      </div>
    </>
  );
}

function DeleteDialog({ dialogRef, onConfirmDeleteHandle }) {
  return (
    <dialog ref={dialogRef} className="delete-dialog">
      <div className="dialog-container">
        <h3>Delete this document?</h3>
        <p>Are you sure you want to delete the ‘welcome.md’ document and its contents? This action cannot be reversed.</p>
        <button className="delete-dialog-btn" onClick={onConfirmDeleteHandle}>
          Confirm & Delete
        </button>
        <button className="cancel-dialog-btn" onClick={() => dialogRef.current.close()}>
          Cancel
        </button>
      </div>
    </dialog>
  );
}

export default App;
