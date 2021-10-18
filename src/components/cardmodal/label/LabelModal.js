import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LabelForm from "./LabelForm";
export default function LabelModal({ id, open, handleClose }) {
  return (
    <div>
      <Dialog open={open} scroll='body' onClose={handleClose} maxWidth={'sm'} hideBackdrop={true}>
        <DialogContent>
          <LabelForm cardID={id} handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}


/*`https://id.atlassian.com/signup/invite?application=trello&
continue=https%3A//trello.com/auth/atlassian/callback?returnUrl%3D%252Fb%252F5zmmoDRl%252Fvacation-plannning%253FcompletedInviteSignup%253D1&signature=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhY2NvdW50IiwiaWF0IjoxNjA0NDc5MDcyLCJleHAiOjE2MDQ0Nzk5NzIsInNjb3BlIjoiaW52aXRlIiwic3ViIjoidGVzdC5lbWFpbC4wODA0MTk5OEBnbWFpbC5jb20ifQ.Nk-e-RbNx0030WQDu9Jje8j4Z21qYraEjAqASlgerCo&infoCode=productSignup`*/