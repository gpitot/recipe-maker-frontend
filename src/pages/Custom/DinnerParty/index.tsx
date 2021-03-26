import React from "react";
import Information from "components/Information";
import Button from "components/Button";

const DinnerParty = () => (
  <Information>
    <h2>Court 1 dinner party!</h2>
    <p>Saturday 1st May, 6.30pm</p>
    <p>Support the club by joining a fantastic dinner event.</p>
    <p>Catering by Sydney Cooking School</p>
    <p>All profits go towards replacing the court lights.</p>
    <p>Any enquiries please contact Michelle on 0414 307 547</p>
    <Button
      text="Sign up here"
      href="https://checkout.square.site/buy/NVCN23MCKFBUGAVEG2TV6HHJ"
      type="link"
    />
  </Information>
);

export default DinnerParty;
