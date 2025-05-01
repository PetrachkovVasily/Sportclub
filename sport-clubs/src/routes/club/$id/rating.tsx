import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export const Route = createFileRoute("/club/$id/rating")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <article className="w-[100%] flex flex-col gap-[12px]">
      <h1 className="text-[22px] font-normal text-[#505050]">Leaders:</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell> </TableHeadCell>
            <TableHeadCell>Member</TableHeadCell>
            <TableHeadCell>Workouts</TableHeadCell>
            <TableHeadCell>Time (hours)</TableHeadCell>
          </TableHead>

          <TableBody>
            <TableRow key={1}>
              <TableCell scope="row">{1}</TableCell>
              <TableCell align="left">{"Name"}</TableCell>
              <TableCell align="left">{"263"}</TableCell>
              <TableCell align="left">{"453"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </article>
  );
}
