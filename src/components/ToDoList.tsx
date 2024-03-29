import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoState, toDoselector } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoselector);
  const [category, setCategory] = useRecoilState(categoryState);

  console.log(toDos);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    // {curentTarget:value} = event;
    setCategory(event.currentTarget.value as any);
  };
  console.log(category);
  return (
    <div>
      <h1> To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
