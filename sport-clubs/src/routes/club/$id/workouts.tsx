import { createFileRoute } from "@tanstack/react-router";
import Accordion from "../../../components/Accordion/Accordion";
import addBtn from "../../../assets/add-svgrepo-com 1.svg";
import saveBtn from "../../../assets/check-svgrepo-com 1.svg";
import deleteBtn from "../../../assets/delete-1-svgrepo-com 1.svg";
import {
  useAddClubActivityMutation,
  useDeleteClubActivityMutation,
  useGetClubActivitiesQuery,
  useGetClubWorkoutsQuery,
} from "../../../services/UserService";
import { useState } from "react";

export const Route = createFileRoute("/club/$id/workouts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const activities = useGetClubActivitiesQuery(id)?.data?.items;

  const [deleteActivity] = useDeleteClubActivityMutation();
  const [createActivity] = useAddClubActivityMutation();

  const [name, setName] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const workouts = useGetClubWorkoutsQuery(id)?.data?.items;

  const handleDelete = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      console.log("Пост удалён!");
    } catch (err) {
      console.error("Ошибка при удалении:", err.data);
    }
  };

  const handleAdd = async () => {
    if (name) {
      createActivity({ name: name, relation: [id] });
      setName("");
      setIsAdd(false);
    }
  };

  return (
    <article className="w-[100%] flex flex-col gap-[22px]">
      <div className="w-[100%] flex flex-col gap-[12px]">
        <h1 className="text-[22px] font-normal text-[#505050] ">Workouts:</h1>
        <div className="flex flex-col w-[100%] gap-[8px] px-[8px] ">
          {workouts?.map((item) => {
            return <Accordion activities={activities} workout={item} />;
          })}

          <button className="mt-[4px] w-fit pl-[10px] pr-[4px] py-[2px] bg-white rounded-2xl border-[2px] border-[#404040]/12 flex">
            Add
            <img src={addBtn} alt="" />
          </button>
        </div>
      </div>

      <div className="w-[100%] flex flex-col gap-[12px] px-[8px] ">
        <h2 className="text-[18px] font-normal text-[#505050] ">Activities:</h2>
        <ul className="space-y-1 text-[#505050] list-disc list-inside l marker:m-[2px] flex flex-col gap-[4px]">
          {activities?.map((item) => {
            return (
              <li
                key={item.id}
                className="font-semibold marker:m-[2px] m-0 flex items-center justify-between gap-[12px] rounded-[4px] max-w-[200px] border-[2px] border-[#404040]/12 w-full px-[6px] py-[2px] "
              >
                {item.name}
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  <img className="w-[22px] " src={deleteBtn} alt="" />
                </button>
              </li>
            );
          })}
        </ul>
        {isAdd && (
          <div className="w-full flex gap-[4px] border-[2px] max-w-[200px] bg-white border-[#505050]/12  rounded-[4px]">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" px-2 py-1 rounded-[4px] w-full"
            />
            <img
              src={saveBtn}
              onClick={handleAdd}
              className="cursor-pointer"
              alt=""
            />
          </div>
        )}
        <button
          onClick={() => {
            setIsAdd(!isAdd);
          }}
          className="mt-[4px] w-fit pl-[10px] pr-[4px] py-[2px] bg-white rounded-2xl border-[2px] border-[#404040]/12 flex"
        >
          Add
          <img src={addBtn} alt="" />
        </button>
      </div>
    </article>
  );
}
