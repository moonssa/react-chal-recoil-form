import { useRecoilValue } from "recoil";
import { toVisitSelector, toVistState } from "./atoms";
import CreateToVisit from "./CreateToVisit";
import ToVisit from "./ToVisit";
import { useEffect } from "react";

function ToVisitList() {
  const [want, have_been, like] = useRecoilValue(toVisitSelector);
  // const toVisitCountries = useRecoilValue(toVistState);
  useEffect(() => {
    localStorage.setItem("want", JSON.stringify(want));
    localStorage.setItem("have_been", JSON.stringify(have_been));
    localStorage.setItem("like", JSON.stringify(like));
  }, [want, have_been, like]);

  return (
    <div>
      <h1> 내가 가고 싶은 나라들 </h1>
      <hr />
      <CreateToVisit />
      <ul>
        {want.map((country) => (
          <ToVisit key={country.id} {...country} />
        ))}
      </ul>
      <hr />
      <h1> 내가 가 본 나라들 </h1>
      <ul>
        {have_been.map((country) => (
          <ToVisit key={country.id} {...country} />
        ))}
      </ul>
      <hr />
      <h1> 내가 좋아하는 나라들 </h1>
      <ul>
        {like.map((country) => (
          <ToVisit key={country.id} {...country} />
        ))}
      </ul>
    </div>
  );
}

export default ToVisitList;
