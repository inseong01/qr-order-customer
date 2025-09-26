import { Request } from "@/types/common";
import CountButton from "@/feature/table/components/count-button/button-index";

export default function PickItem({ item }: { item: Request }) {
  return (
    <li className={"flex h-6 w-full items-center justify-between gap-4"}>
      <div>{item.title}</div>
      {item.title !== "직원호출" && (
        <CountButton type={"call"} amount={item.amount} id={item.id} />
      )}
    </li>
  );
}
