import React from "react";
import Information from "components/Information";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <>
      <Information styles={style.gap}>
        <img
          src="/assets/ladder-benefits.png"
          alt="Ladder league benefits"
          className={style.centralImage}
        />
        Based on your rank in the league you get higher discounts on Monday's.
        Challenge someone <Link to={"/competition"}>here</Link>.
      </Information>

      <Information styles={style.gap} readMore>
        <h2>Monday Night Social</h2>
        <p>Our Monday Night Social Hit is made up of three sessions.</p>
        <p>
          The first session runs from 6:00PM – 7:00PM and is a coaching session
          run by our local super coach Dominique Ratcliffe. This session has a
          max capacity of 4 players and is suitable to all skill levels who are
          looking to improve their game. The cost of the session is $10 per
          person.
        </p>
        <p>
          The second session of the night runs from 7:00PM – 8:30PM and is
          geared towards beginner to intermediate players. This session has a
          max capacity of 9 players and involves playing rotating games against
          each other. The cost of the session is $17.50 per person.
        </p>
        <p>
          The third session of the night runs from 8:30PM – 10:00PM and is
          geared towards intermediate to advanced players. The format is exactly
          the same as our second session with a max capacity of 9 players. The
          cost of the session is $17.50 per person.
        </p>
      </Information>

      <Information styles={style.gap} readMore>
        <h2>Ladder League</h2>
        <p>Think you're ready to challenge the best? Join our Ladder League.</p>
        <p>
          We have an internal ladder league at North Manly Squash, which you can
          work your way up until you're challenging the best we have to offer.
        </p>
        <h3>How it works</h3>
        <p>1. Send out a challenge to someone above you. </p>
        <p>2. They accept the challenge. </p>
        <p>3. Organise a time to play the match. </p>
        <p>4. Book the courts.</p>
        <p>5. Play the Best of 5 , first to 15. </p>
        <p>6. Enter the result. </p>
        <p>
          7. If the lower ranked player wins, they will take the higher ranked
          player's rank.
        </p>
      </Information>
      <Information styles={style.gap}>
        <h2>Pennant competition</h2>
        <p>Pennant is our inter club competition.</p>
        <p>We have a number of teams available to join at all skill levels.</p>
        <p>
          We play one night a week against a different club on the North Shore.
        </p>
        <p>There are two seasons each year, Autumn and Spring.</p>
      </Information>

      <Information styles={style.gap}>
        <h2>Find us here</h2>
        <p>
          <a href="https://www.google.com/maps/place/Warringah+Recreation+Centre/@-33.7773854,151.2591163,14.68z/data=!4m5!3m4!1s0x6b12aa51dd691ff1:0xc667a9b00067a5de!8m2!3d-33.7754149!4d151.2695403">
            4 Kentwell Rd, North Manly NSW 2100
          </a>
        </p>
        <a href="https://www.google.com/maps/place/Warringah+Recreation+Centre/@-33.7773854,151.2591163,14.68z/data=!4m5!3m4!1s0x6b12aa51dd691ff1:0xc667a9b00067a5de!8m2!3d-33.7754149!4d151.2695403">
          <img src="/assets/map.png" alt="map" />
        </a>
      </Information>

      <Information styles={style.gap}>
        <h2>Connect with us</h2>
        <a href="https://chat.whatsapp.com/FExpmUjOxV0L3PSoW3QJiU">
          <img
            src="/assets/whatsapp.png"
            className={style.icon}
            alt="whatsapp"
          />
        </a>
        <a href="https://www.facebook.com/groups/427687110671206">
          <img
            src="/assets/facebook.png"
            className={style.icon}
            alt="facebook"
          />
        </a>
      </Information>
    </>
  );
};

export default Faq;
