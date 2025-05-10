import React, { useEffect, useState } from "react";
import Activity from "../Activity/Activity";
import Dropdown from "../Dropdown/Dropdown";
import {
  useGetActivityQuery,
  useUpdateWorkoutActivityMutation,
} from "../../services/UserService";

interface Props {}

function AccordionItem({ activities, workoutActivity }) {
  const activity = useGetActivityQuery(workoutActivity.id)?.data?.items;

  const [activityField, setActivityField] = useState(activities[0].name);
  const [amount, setAmount] = useState(workoutActivity.amount);
  const [approaches, setApproaches] = useState(workoutActivity.approaches);

  const [updateWorkoutActivity] = useUpdateWorkoutActivityMutation();

  useEffect(() => {
    if (activity) {
      setActivityField(activity[0].name);
    }
  }, [activity]);

  useEffect(() => {
    updateWorkoutActivity({
      ...workoutActivity,
      amount: amount,
      approaches: approaches,
    });
  }, [activityField, amount, approaches]);

  return (
    <Activity
      amount={amount}
      approaches={approaches}
      setAmount={setAmount}
      setApproaches={setApproaches}
    >
      {!!activity && (
        <Dropdown
          options={activities?.map((item) => {
            return { value: item.name, name: item.name };
          })}
          //   onChange={}
          width={undefined}
          value={activityField}
          onChange={setActivityField}
        />
      )}
    </Activity>
  );
}

export default AccordionItem;
