interface IEditorToolbarProps {
  id: string;
}

export default function EditorToolbar({ id }: IEditorToolbarProps) {
  return (
    <div id={id}>
      <span className="ql-formats">
        <select className="ql-font" defaultValue="roboto">
          <option value="roboto">Roboto</option>
          <option value="arial">Arial</option>
          <option value="courier-new">Courier New</option>
          <option value="helvetica">Helvetica</option>
        </select>
        <select className="ql-size" defaultValue="">
          <option value="small"></option>
          <option></option>
          <option value="large"></option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
        <button className="ql-clean" />
      </span>
    </div>
  );
}
