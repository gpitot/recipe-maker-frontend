import React from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import "react-square-payment-form/lib/default.css";
import API from "rest/api";

import CONFIG from "./config";

const { SANDBOX_APPLICATION_ID, SANDBOX_LOCATION_ID } = CONFIG;

const PaymentForm = () => {
  const cardNonceResponseReceived = (
    errors: [any] | null,
    nonce: string,
    cardData: any
  ) => {
    //https://developer.squareup.com/docs/api/paymentform/?q=verificationdetails#cardnonceresponsereceived
    console.log(nonce, errors, cardData);
    API.shop.performPayment(nonce, 100000).then((res) => {
      console.log(res);
    });
  };

  //   const createVerificationDetails = () => {
  //     //https://developer.squareup.com/docs/api/paymentform/?q=verificationdetails#datatype-sqverificationdetails

  //     return {
  //       amount: "100.00",
  //       currencyCode: "AUD",
  //       intent: "CHARGE",
  //       billingContact: {
  //         familyName: "Smith",
  //         givenName: "John",
  //         email: "jsmith@example.com",
  //         country: "AU",
  //         city: "London",
  //         addressLines: ["1235 Emperor's Gate"],
  //         postalCode: "SW7 4JA",
  //         phone: "020 7946 0532",
  //       },
  //     };
  //   };

  return (
    <div>
      <SquarePaymentForm
        formId="1"
        apiWrapper=""
        sandbox={true}
        applicationId={SANDBOX_APPLICATION_ID}
        locationId={SANDBOX_LOCATION_ID}
        cardNonceResponseReceived={cardNonceResponseReceived}
        // createVerificationDetails={createVerificationDetails}
      >
        <fieldset className="sq-fieldset">
          <CreditCardNumberInput />
          <div className="sq-form-third">
            <CreditCardExpirationDateInput />
          </div>

          <div className="sq-form-third">
            <CreditCardPostalCodeInput />
          </div>

          <div className="sq-form-third">
            <CreditCardCVVInput />
          </div>
        </fieldset>

        <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>
      </SquarePaymentForm>
    </div>
  );
};

export default PaymentForm;
