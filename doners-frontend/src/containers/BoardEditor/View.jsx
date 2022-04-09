// TOAST UI Editor import
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

function View({ content }) {
  return (
    <>
      <Viewer initialValue={content} />
    </>
  );
}

export default View;
