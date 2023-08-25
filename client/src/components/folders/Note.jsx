import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromHTML, convertToRawHtml } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { draftToHtml } from 'draftjs-to-html';

export default function Note() {
  const note = {
    id: '9999',
    content: '<p>This is new note</p>',
  };

  const [editor, setEditor] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blockFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(blockFromHTML.contentBlocks, blockFromHTML.entityMap);
    setEditor(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditor(e);
    setRawHTML(draftToHtml(convertToRawHtml(e.getCurrentContent())));
  };

  return <Editor editorState={editor} onChange={handleOnChange} placeholder="Nhập ghi chú..." />;
}
