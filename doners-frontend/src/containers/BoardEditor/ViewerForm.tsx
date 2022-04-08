import { Viewer } from '@toast-ui/react-editor';
import React from 'react';

const ViewerForm = ({ contents }: any) => {
  return (
    <div>
      <Viewer initialValue={contents} />
    </div>
  );
};

export default ViewerForm;
