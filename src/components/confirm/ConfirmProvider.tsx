import React, { useState, useCallback, Fragment, useEffect, useContext } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { createContext } from "react";

export interface IConfirmOption {
  title?: string;
  description?: string;
  content?: any;
  confirmationText?: string;
  cancellationText?: string;
  dialogProps?: object;
  dialogActionsProps?: object;
  confirmationButtonProps?: object;
  cancellationButtonProps?: object;
  titleProps?: object;
  contentProps?: object;
  allowClose?: true;
  confirmationKeyword?: string;
  confirmationKeywordTextFieldProps?: object;
  hideCancelButton?: false;
  buttonOrder?: ["cancel", "confirm"];
  acknowledgement?: false;
  acknowledgementFormControlLabelProps?: object;
  acknowledgementCheckboxProps?: object;
}

const DEFAULT_OPTIONS: IConfirmOption = {
  title: "Are you sure?",
  description: "",
  content: null,
  confirmationText: "Ok",
  cancellationText: "Cancel",
  dialogProps: {},
  dialogActionsProps: {},
  confirmationButtonProps: {},
  cancellationButtonProps: {},
  titleProps: {},
  contentProps: {},
  allowClose: true,
  confirmationKeyword: "",
  confirmationKeywordTextFieldProps: {},
  hideCancelButton: false,
  buttonOrder: ["cancel", "confirm"],
  acknowledgement: false,
  acknowledgementFormControlLabelProps: {},
  acknowledgementCheckboxProps: {},
};

export const ConfirmContext = createContext((options?: IConfirmOption) => {
  return new Promise((resolve, reject) => {});
});

const buildOptions = (defaultOptions: IConfirmOption, options: IConfirmOption) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
  };
  const dialogActionsProps = {
    ...(defaultOptions.dialogActionsProps || DEFAULT_OPTIONS.dialogActionsProps),
    ...(options.dialogActionsProps || {}),
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {}),
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {}),
  };
  const titleProps = {
    ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
    ...(options.titleProps || {}),
  };
  const contentProps = {
    ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
    ...(options.contentProps || {}),
  };
  const confirmationKeywordTextFieldProps = {
    ...(defaultOptions.confirmationKeywordTextFieldProps || DEFAULT_OPTIONS.confirmationKeywordTextFieldProps),
    ...(options.confirmationKeywordTextFieldProps || {}),
  };
  const acknowledgementFormControlLabelProps = {
    ...(defaultOptions.acknowledgementFormControlLabelProps || DEFAULT_OPTIONS.acknowledgementFormControlLabelProps),
    ...(options.acknowledgementFormControlLabelProps || {}),
  };
  const acknowledgementCheckboxProps = {
    ...(defaultOptions.acknowledgementCheckboxProps || DEFAULT_OPTIONS.acknowledgementCheckboxProps),
    ...(options.acknowledgementCheckboxProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    dialogProps,
    dialogActionsProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    confirmationKeywordTextFieldProps,
    acknowledgementFormControlLabelProps,
    acknowledgementCheckboxProps,
  };
};

let confirmGlobal;

interface IConfirmProviderProps {
  children: React.ReactNode;
  defaultOptions?: IConfirmOption;
}

const ConfirmProvider = ({ children, defaultOptions = {} }: IConfirmProviderProps) => {
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);
  const [key, setKey] = useState(0);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setKey((key) => key + 1);
      setOptions(options);
      setResolveReject([resolve, reject]);
    });
  }, []);

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  confirmGlobal = confirm;

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmationDialog
        key={key}
        open={resolveReject.length === 2}
        options={buildOptions(defaultOptions, options)}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};

export default ConfirmProvider;

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

export { confirmGlobal as confirm };
