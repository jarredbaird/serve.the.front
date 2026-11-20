import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";

const ShowUsers = () => {
  const { users } = useContext(DataContext);
  return (
    <>
      <h2 className="d-flex justify-content-center">all users.</h2>
      <div className="row row-cols-1 row-cols-md-1 g-4">
        {users.map((user) => {
          return (
            <div className="col" key={user.uId}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{`${user.uName}`}</h5>
                  <p className="card-text">{user.username}</p>
                  <p className="card-text">
                    {user.qualifiedRoles.map((qualifiedRoles, i) => {
                      return (
                        <span
                          key={qualifiedRoles.rId ?? i}
                          className="badge rounded-pill bg-primary mx-1">
                          {qualifiedRoles.rTitle}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowUsers;
