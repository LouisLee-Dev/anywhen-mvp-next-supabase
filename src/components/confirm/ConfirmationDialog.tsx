import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IConfirmOption } from "./ConfirmProvider";
import { Checkbox } from "@/components/ui/checkbox";

interface IConfirmationDialogProps {
  open: boolean;
  options: IConfirmOption;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }: IConfirmationDialogProps) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    dialogActionsProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
    confirmationKeyword,
    confirmationKeywordTextFieldProps,
    hideCancelButton,
    buttonOrder,
    acknowledgement,
    acknowledgementFormControlLabelProps,
    acknowledgementCheckboxProps,
  } = options;

  const [confirmationKeywordValue, setConfirmationKeywordValue] = React.useState("");
  const [isAcknowledged, setIsAcknowledged] = React.useState(false);

  const confirmationButtonDisabled = Boolean(
    (confirmationKeyword && confirmationKeywordValue !== confirmationKeyword) || (acknowledgement && !isAcknowledged)
  );

  const acknowledgeCheckbox = (
    <>
      {acknowledgement && (
        <div className="flex items-center space-x-2">
          <Checkbox
            {...acknowledgementCheckboxProps}
            checked={isAcknowledged}
            onCheckedChange={(v) => setIsAcknowledged(v === true)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {acknowledgement}
          </label>
        </div>
      )}
    </>
  );

  const confirmationContent = (
    <>
      {confirmationKeyword && (
        <Input
          onChange={(e) => setConfirmationKeywordValue(e.target.value)}
          value={confirmationKeywordValue}
          {...confirmationKeywordTextFieldProps}
        />
      )}
    </>
  );

  const dialogActions = buttonOrder.map((buttonType) => {
    if (buttonType === "cancel") {
      return (
        !hideCancelButton && (
          <Button key="cancel" {...cancellationButtonProps} onClick={onCancel} variant="danger">
            {cancellationText}
          </Button>
        )
      );
    }

    if (buttonType === "confirm") {
      return (
        <Button
          key="confirm"
          variant="default"
          disabled={confirmationButtonDisabled}
          {...confirmationButtonProps}
          onClick={onConfirm}
          className="w-[80px]"
        >
          {confirmationText}
        </Button>
      );
    }

    throw new Error(`Supported button types are only "confirm" and "cancel", got: ${buttonType}`);
  });

  return (
    <Dialog
      {...dialogProps}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          if (allowClose) onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>{title && <DialogTitle {...titleProps}>{title}</DialogTitle>} </DialogHeader>
        {content ? (
          <div {...contentProps} className="p-4">
            {content}
            {confirmationContent}
            {acknowledgeCheckbox}
          </div>
        ) : description ? (
          <div {...contentProps} className="p-4">
            <div className="text-base">{description}</div>
            {confirmationContent}
            {acknowledgeCheckbox}
          </div>
        ) : (
          (confirmationKeyword || acknowledgeCheckbox) && (
            <div {...contentProps} className="p-4">
              {confirmationContent}
              {acknowledgeCheckbox}
            </div>
          )
        )}
        <DialogFooter {...dialogActionsProps}>
          <div className="flex items-center justify-between w-full">{dialogActions}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
