import React from "react";
import { Helmet } from "react-helmet";

export default function Terms() {
  return (
    <div>
      <Helmet>
        <title>CM Sharer (yandex) - Terms & Conditions</title>
      </Helmet>
      <div className="card text-center w-75 bg-light mx-auto mt-5 pt-5">
        <div className="card-header">
          <h1>Terms & Conditions</h1>
        </div>
        <div className="card-body">
          <p className="card-text">
            <div className="card-body text-muted">
              <strong>
                The CM Sharer Service Agreement describes the terms and
                conditions under which CM Sharer offers services to you. By
                using our services, the User agrees to be bound by the following
                terms and conditions:
              </strong>
              <ul>
                <li>
                  We reserve the right to delete Google DMCA-affected files
                  without the user's knowledge.
                </li>
                <li>
                  Pornography, nudity, sexual images and any kind offensive
                  images or videos are prohibited. Copyrighted material are also
                  strictly prohibited. We reserve the right to decide
                  appropriate content and can delete images or videos at any
                  time without User notification.
                </li>
                <li>
                  We reserve the right to disable direct linking on user
                  accounts that use excessive bandwidth or misuse the system.
                </li>
                <li>
                  Pornography, nudity, sexual images and any offensive images or
                  videos are prohibited. Copyrighted material is also strictly
                  prohibited. We reserve the right to deceive content and may
                  delete photos or videos at any time without User notice.
                </li>
                <li>
                  The user must agree to comply with all applicable rules,
                  including copyright and trademark laws. Images, videos and
                  files that infringe copyrights or trademarks are not allowed.
                  If someone has a violation claim against you, you will be
                  prompted to delete the copyrighted file until the issue is
                  resolved. If there is a dispute between the participants on
                  this site, CM Sharer is not obliged to be involved.
                </li>
                <li>
                  CM Sharer is not liable for your images, videos or files or
                  any lost business due to the unavailability or loss of the
                  website. We make no claims of future reliability in serving,
                  hosting or storing your images, videos or files.
                </li>
              </ul>
              <b>
                CM Sharer is commited to cooperate with any and all legal
                authorities if an investigation should arise.
              </b>
            </div>
          </p>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </div>
  );
}
