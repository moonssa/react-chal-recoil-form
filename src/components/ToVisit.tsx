import { useSetRecoilState } from "recoil";
import { IToVisit, toVistState } from "./atoms";

function ToVisit({ text, category, id }: IToVisit) {
  // const onClick = (newCategory: IToVisit["category"]) => {};
  const setToVisitCountries = useSetRecoilState(toVistState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToVisitCountries((oldVisit) => {
      const targetIndex = oldVisit.findIndex((toVisit) => toVisit.id === id);
      if (name === "DELETE") {
        return [
          ...oldVisit.slice(0, targetIndex),

          ...oldVisit.slice(targetIndex + 1),
        ];
      }
      const newVisit = { text, id, category: name as any };
      return [
        ...oldVisit.slice(0, targetIndex),
        newVisit,
        ...oldVisit.slice(targetIndex + 1),
      ];
    });
    console.log("Here is ", name);
  };

  return (
    <li>
      <span>{text}</span>
      {category === "WANT" ? (
        <>
          {/* <button onClick={() => onClick("HAVE_BEEN")}>✅</button> */}
          <button name="HAVE_BEEN" onClick={onClick}>
            ✅
          </button>
          <button name="DELETE" onClick={onClick}>
            🗑️
          </button>
        </>
      ) : category === "HAVE_BEEN" ? (
        <>
          <button name="LIKE" onClick={onClick}>
            👍
          </button>
          <button name="WANT" onClick={onClick}>
            ❌
          </button>
        </>
      ) : category === "LIKE" ? (
        <button name="HAVE_BEEN" onClick={onClick}>
          👎
        </button>
      ) : null}
    </li>
  );
}

export default ToVisit;
