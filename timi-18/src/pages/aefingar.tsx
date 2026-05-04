import { useCallback, useEffect, useRef, useState } from "react";

export function Aefingar() {
  const [count, setCounter] = useState(0);
  const [color, setColor] = useState("blue");
  const focusRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [asyncUsers, setAsyncUsers] = useState<any>([]);
  // Það sem er í þessum useEffect gerist við hvert re render
  useEffect(() =>
    console.log("renderast við hvert re render eða state update"),
  );

  // Það sem er i þessum useEffect gerist bara einusinni i byrjun inni a sidu
  useEffect(() => console.log("renderast alltaf bara einusinni i byrjun"), []);

  // Það sem er i þessum useEffect gerist alltaf þegar breytanm inni i [] breytist
  useEffect(() => console.log("count breyttist: ", count), [count]);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.sort()))
      .catch((err: Error) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="lesson-page">
      <header className="lesson-hero">
        Við ætlum að fara í dæmi af: useState, useEffect og cleanup
      </header>
      <section>
        <div id="lesson-1" className="demo-card">
          <p>Skoðum hvernig state og rendering hage sér</p>
          <button className="btn" onClick={() => setCounter((c) => c + 1)}>
            +
          </button>
          <div className="stat">{count}</div>
          <button className="btn" onClick={() => setCounter((c) => c - 1)}>
            -
          </button>
        </div>
        <div className="demo-card">
          <button className="btn" onClick={() => setColor("Blue")}>
            BLUE
          </button>
          <div>{color}</div>
          <button className="btn" onClick={() => setColor("Red")}>
            RED
          </button>
        </div>
      </section>
      <section>
        <div className="demo-card">
          <input
            ref={focusRef}
            className="field"
            placeholder="fæ focus þegar þu smellir a takkann"
          />
          <button
            className="btn btn-primary"
            onClick={() => focusRef.current?.focus()}
          >
            Setja Focus
          </button>
        </div>
      </section>
      <section>
        <div className="demo-card">
          {asyncUsers.map((user) => (
            <p>{user.name}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
