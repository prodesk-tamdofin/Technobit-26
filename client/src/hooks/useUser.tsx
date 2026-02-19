import { getFullData, loggedInAndData } from "@/api/authentication";
import { parseConditionalJSON } from "@/utils/JSONparse";
import { useEffect, useState } from "react";

const useUser = (fullData?: boolean, deps?: any[]) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ msg: string; code: number } | null>(
    null,
  );
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await loggedInAndData();
        if (!res.succeed) {
          setLoading(false);
          setUser(null);
          setError({ msg: "User Not Logged In", code: 401 });
        } else {
          if (fullData) {
            const fullResp = await getFullData(res.result.userName);
            if (fullResp?.result) {
              // Old format: has ParEvent object
              if (fullResp.result.ParEvent) {
                Object.keys(fullResp.result.ParEvent).map((key) => {
                  const val = fullResp.result.ParEvent[key];
                  fullResp.result.ParEvent[key] = parseConditionalJSON(val);
                });
              } else if (fullResp.result.registeredEvents) {
                // New MongoDB format: has registeredEvents array
                // Build clientEvents from registeredEvents array
                fullResp.result.clientEvents = fullResp.result.registeredEvents;
              }
              setUser({ ...fullResp.result, ...res.result });
            } else {
              // fullSingle failed, fall back to basic user data
              setUser(res.result);
            }
          } else {
            setUser(res.result);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError({ msg: "Something Went Wrong!", code: 500 });
      }
    })();
  }, [...(deps || []), fullData]);

  return [user, loading, error];
};

export default useUser;
