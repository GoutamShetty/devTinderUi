/**
 * @author Goutam Shetty <goutam.shetty@314ecorp.com>
 * @description Connections
 */

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import type { User } from "../types/common";

const Connections: React.FC = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store: any) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0) {
    return <h1 className="flex justify-center my-10">No Connections Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections?.map((connection: User) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-80 h-30 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
