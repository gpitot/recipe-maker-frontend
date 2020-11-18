import React from "react";
import style from "./style.module.scss";

const Squash = () => (
  <>
    <h5 className={style.detailTitle}>Squash</h5>
    <p>When : Every Monday night from 6pm-10pm.</p>
    <p>
      Sessions :
      <ul>
        <li>$10 Coaching : 6pm-7pm</li>
        <li>$17.50 Session 1 : 7pm-830pm</li>
        <li>$17.50 Session 2 : 830pm-10pm</li>
      </ul>
    </p>
  </>
);

const Raquet = () => (
  <>
    <h5 className={style.detailTitle}>Racquetball</h5>
    <p>When : Every Thursday night from 8pm-10pm.</p>
    <p>Cost : $20</p>
  </>
);

export { Squash, Raquet };
