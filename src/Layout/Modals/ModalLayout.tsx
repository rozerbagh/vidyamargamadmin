import React from 'react';
import { ModalLayoutProps } from "../../Interfaces/ComponentInterface"

const ModalLayout: React.FC<ModalLayoutProps> = ({ title, children, okText }) => {

  return (
    <>
      <div className="modal-wrapper">
        <div className="modal-container">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalLayout;