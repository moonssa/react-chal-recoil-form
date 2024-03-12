import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toVistState } from "./atoms";

interface IformData {
  toVisit: string;
}

function CreateToVisit() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IformData>();

  const setToVisitCountries = useSetRecoilState(toVistState);

  const handleValid = ({ toVisit }: IformData) => {
    setValue("toVisit", "");
    setToVisitCountries((old) => [
      { text: toVisit, id: Date.now(), category: "WANT" },
      ...old,
    ]);
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(handleValid)}
    >
      <input
        {...register("toVisit", {
          required: "Please write to visit country",
        })}
        placeholder="가고 싶은 나라를 적으세요."
      />

      <span>{errors?.toVisit?.message as string}</span>

      <input type="submit" value="Add" />
    </form>
  );
}

export default CreateToVisit;
