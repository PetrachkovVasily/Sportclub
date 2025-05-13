import React, { useEffect, useState } from "react";
import Activity from "../Activity/Activity";
import Dropdown from "../Dropdown/Dropdown";
import {
  useAddWorkoutActivityMutation,
  useDeleteWorkoutActivityMutation,
  useUpdateWorkoutActivityMutation,
} from "../../services/UserService";

interface Props {}

function AccordionItem({ activities, workoutActivity }) {
  const [activityField, setActivityField] = useState(workoutActivity.activity);
  const [amount, setAmount] = useState(workoutActivity.amount);
  const [approaches, setApproaches] = useState(workoutActivity.approaches);

  const [updateWorkoutActivity] = useUpdateWorkoutActivityMutation();
  const [deleteWorkoutActivity] = useDeleteWorkoutActivityMutation();

  // useEffect(() => {
  //   // if (activity) {
  //   setActivityField(activities[0].name);
  //   // }
  // }, []);

  useEffect(() => {
    updateWorkoutActivity({
      ...workoutActivity,
      amount: amount,
      approaches: approaches,
      activity: activityField,
    });
  }, [activityField, amount, approaches]);

  const handleDelete = () => {
    deleteWorkoutActivity(workoutActivity.id);
  };

  return (
    <Activity
      amount={amount}
      approaches={approaches}
      setAmount={setAmount}
      setApproaches={setApproaches}
      handleDelete={handleDelete}
    >
      {activities && (
        <>
          {!!activities[0].name && (
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
        </>
      )}
    </Activity>
  );
}

export default AccordionItem;
