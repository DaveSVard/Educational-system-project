import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { userVerifyAPI } from "../../features/admin/adminAPI";
import "./verify.scss"

export const Verify: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState<boolean>(false);

  useEffect(() => {
    const email: any = searchParams.get("email");
    const emailToken: any = searchParams.get("emailToken");

    dispatch(userVerifyAPI({ email: email, emailToken: emailToken })).then(
      (res) => {
        setMessage(true);
      }
    );
  }, []);

  return (
    <div className="verify">
      <div className="container">
        <div className="verify__wrapper">
          {!message ? (
            <div>
              <h1 className="title">Loading...</h1>
            </div>
          ) : (
            <div>
                <h1 className="title">You are verifed! <Link to={"/"}>Click!</Link></h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
