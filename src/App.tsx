// App.tsx
import React, { useState } from "react";

const SPELTYPE: Record<string, "Normaal" | "Speciaal"> = {
  "Samen 8": "Normaal",
  "Alleen 5": "Normaal",
  "Samen 9": "Normaal",
  "Alleen 6": "Normaal",
  "Samen 10": "Normaal",
  "Alleen 7": "Normaal",
  "Samen 11": "Normaal",
  "Kleine Miserie": "Speciaal",
  "Alleen 8": "Normaal",
  "Samen 12": "Normaal",
  Piccolo: "Speciaal",
  "Samen 13": "Normaal",
  "Troel 8": "Normaal",
  "Troel 9": "Normaal",
  "Abondance 9": "Normaal",
  "Grote Miserie": "Speciaal",
  "Abondance 10": "Normaal",
  "Abondance 11": "Normaal",
  "Miserie op Tafel": "Speciaal",
  Soloslim: "Speciaal",
};

const SOLO_SPELLEN = [
  "Alleen 5",
  "Alleen 6",
  "Alleen 7",
  "Alleen 8",
  "Abondance 9",
  "Abondance 10",
];

const SPECIAAL_SPEL_PUNTEN: Record<string, number> = {
  "Kleine Miserie": 6,
  Piccolo: 8,
  "Grote Miserie": 12,
  "Miserie op Tafel": 24,
  Soloslim: 60,
};

const PUNTENTABEL_SPELERS: Record<string, number[]> = {
  "Samen 8": [-29, -26, -23, -20, -17, -14, -11, 8, 11, 14, 17, 20, 30],
  "Alleen 5": [-21, -18, -15, -12, 9, 12, 15, 18, 18, 18, 18, 18, 18],
  "Samen 9": [-35, -32, -29, -26, -23, -20, -17, -14, 11, 14, 17, 20, 30],
  "Alleen 6": [-27, -24, -21, -18, -15, 12, 15, 18, 18, 18, 18, 18, 18],
  "Samen 10": [-40, -37, -34, -31, -28, -25, -22, -19, -16, 14, 17, 20, 30],
  "Alleen 7": [-33, -30, -27, -24, -21, -18, 15, 18, 18, 18, 18, 18, 18],
  "Samen 11": [-46, -43, -40, -37, -34, -31, -28, -25, -22, -19, 17, 20, 30],
  "Alleen 8": [-42, -39, -36, -33, -30, -27, -24, 21, 21, 21, 21, 21, 21],
  "Samen 12": [-53, -50, -47, -44, -41, -38, -35, -32, -29, -26, -23, 20, 30],
  "Samen 13": [-59, -56, -53, -50, -47, -44, -41, -38, -35, -32, -29, -26, 30],
  "Troel 8": [0, 0, 0, 0, -16, -16, -16, 16, 16, 16, 16, 16, 30],
  "Troel 9": [0, 0, 0, 0, -16, -16, -16, -16, 16, 16, 16, 16, 30],
  "Abondance 9": [-30, -30, -30, -30, -30, -30, -30, -30, 30, 45, 60, 90, 90],
  "Abondance 10": [-45, -45, -45, -45, -45, -45, -45, -45, -45, 45, 60, 90, 90],
  "Abondance 11": [
    -60, -60, -60, -60, -60, -60, -60, -60, -60, -60, 60, 90, 90,
  ],
};

const PUNTENTABEL_TEGENSPELERS: Record<string, number[]> = {
  "Samen 8": [29, 26, 23, 20, 17, 14, 11, -8, -11, -14, -17, -20, -30],
  "Alleen 5": [7, 6, 5, 4, -3, -4, -5, -6, -6, -6, -6, -6, -6],
  "Samen 9": [35, 32, 29, 26, 23, 20, 17, 14, -11, -14, -17, -20, -30],
  "Alleen 6": [9, 8, 7, 6, 5, -4, -5, -6, -6, -6, -6, -6, -6],
  "Samen 10": [40, 37, 34, 31, 28, 25, 22, 19, 16, -14, -17, -20, -30],
  "Alleen 7": [11, 10, 9, 8, 7, 6, -5, -6, -6, -6, -6, -6, -6],
  "Samen 11": [46, 43, 40, 37, 34, 31, 28, 25, 22, 19, -17, -20, -30],
  "Alleen 8": [14, 13, 12, 11, 10, 9, 8, -7, -7, -7, -7, -7, -7],
  "Samen 12": [53, 50, 47, 44, 41, 38, 35, 32, 29, 26, 23, -20, -30],
  "Samen 13": [59, 56, 53, 50, 47, 44, 41, 38, 35, 32, 29, 26, -30],
  "Troel 8": [0, 0, 0, 0, 16, 16, 16, -16, -16, -16, -16, -16, -30],
  "Troel 9": [0, 0, 0, 0, 16, 16, 16, 16, -16, -16, -16, -16, -30],
  "Abondance 9": [10, 10, 10, 10, 10, 10, 10, 10, -10, -15, -20, -30, -30],
  "Abondance 10": [15, 15, 15, 15, 15, 15, 15, 15, 15, -15, -20, -30, -30],
  "Abondance 11": [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, -20, -30, -30],
};

export default function KleurenwiesApp() {
  const [players, setPlayers] = useState<string[]>([]);
  const [inputNames, setInputNames] = useState(["", "", "", ""]);
  const [rounds, setRounds] = useState<any[]>([]);

  const confirmNames = () => {
    setPlayers(inputNames.map((n) => n.trim()));
  };

  const addRound = () => {
    setRounds([
      ...rounds,
      {
        spel: "",
        spelers: [],
        slagen: 0,
        gewonnen: {},
        punten: {},
      },
    ]);
  };

  const updateRound = (index: number, key: string, value: any) => {
    const newRounds = [...rounds];
    if (key === "slagen") {
      value = Math.max(0, Math.min(value, 13));
    }
    newRounds[index][key] = value;
    const round = newRounds[index];
    const { spel, slagen, spelers, gewonnen } = round;

    if (
      spel &&
      (key === "spel" ||
        key === "spelers" ||
        key === "slagen" ||
        key === "gewonnen")
    ) {
      const puntenPerSpeler: Record<string, number> = {};

      if (SPELTYPE[spel] === "Normaal" && spelers.length > 0) {
        const i = Math.max(0, Math.min(slagen - 1, 12));
        const ps = PUNTENTABEL_SPELERS[spel]?.[i] ?? 0;
        const pt = PUNTENTABEL_TEGENSPELERS[spel]?.[i] ?? 0;
        players.forEach(
          (p) => (puntenPerSpeler[p] = spelers.includes(p) ? ps : pt)
        );
      } else if (SPELTYPE[spel] === "Speciaal") {
        players.forEach((p) => (puntenPerSpeler[p] = 0));
        spelers.forEach((speler) => {
          const gewonnenSpel = gewonnen[speler];
          const basis = SPECIAAL_SPEL_PUNTEN[spel] ?? 0;
          const score = gewonnenSpel ? 3 * basis : -3 * basis;
          const tegenScore = -score / (players.length - 1);
          players.forEach((p) => {
            if (p === speler) {
              puntenPerSpeler[p] += score;
            } else {
              puntenPerSpeler[p] += tegenScore;
            }
          });
        });
      }
      newRounds[index].punten = puntenPerSpeler;
    }

    setRounds(newRounds);
  };

  const totaal = (speler: string) =>
    rounds.reduce((acc, r) => acc + (r.punten?.[speler] || 0), 0);
  const isSoloSpel = (spel: string) => SOLO_SPELLEN.includes(spel);

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Segoe UI, Roboto, sans-serif",
        backgroundColor: "#f9f9fb",
        color: "#333",
      }}
    >
      {!players.length ? (
        <div>
          <h2>Geef 4 spelers op</h2>
          {inputNames.map((name, i) => (
            <input
              key={i}
              value={name}
              onChange={(e) => {
                const nieuw = [...inputNames];
                nieuw[i] = e.target.value;
                setInputNames(nieuw);
              }}
              placeholder={`Speler ${i + 1}`}
              style={{
                margin: 4,
                padding: 6,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          ))}
          <div style={{ marginTop: 10 }}>
            <button
              onClick={confirmNames}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
              }}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div>
          <table
            border={1}
            cellPadding={5}
            style={{
              marginTop: 20,
              borderCollapse: "collapse",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <thead style={{ backgroundColor: "#eaeaea" }}>
              <tr>
                <th>#</th>
                <th>Spel</th>
                <th>Spelers</th>
                <th>Slagen / Gewonnen</th>
                {players.map((p) => (
                  <th key={p}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rounds.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    <select
                      value={r.spel}
                      onChange={(e) => updateRound(i, "spel", e.target.value)}
                      style={{ padding: 4 }}
                    >
                      <option value="">--</option>
                      {Object.keys(SPELTYPE).map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    {players.map((p) => (
                      <label key={p} style={{ display: "block" }}>
                        <input
                          type="checkbox"
                          checked={r.spelers.includes(p)}
                          onChange={(e) => {
                            let nieuw: string[];
                            if (e.target.checked) {
                              nieuw = isSoloSpel(r.spel)
                                ? [p]
                                : [...r.spelers, p];
                            } else {
                              nieuw = r.spelers.filter((x) => x !== p);
                            }
                            updateRound(i, "spelers", nieuw);
                          }}
                          disabled={
                            isSoloSpel(r.spel) &&
                            !r.spelers.includes(p) &&
                            r.spelers.length >= 1
                          }
                        />{" "}
                        {p}
                      </label>
                    ))}
                  </td>
                  <td>
                    {SPELTYPE[r.spel] === "Normaal" ? (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                          gap: 8,
                        }}
                      >
                        {Array.from({ length: 14 }, (_, s) => (
                          <label key={s} style={{ whiteSpace: "nowrap" }}>
                            <input
                              type="radio"
                              name={`slagen-${i}`}
                              checked={r.slagen === s}
                              onChange={() => updateRound(i, "slagen", s)}
                            />{" "}
                            {s}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div>
                        {r.spelers.map((p) => (
                          <div key={p} style={{ marginBottom: 4 }}>
                            <strong>{p}</strong>
                            <br />
                            <label>
                              <input
                                type="radio"
                                name={`speciaal-${i}-${p}`}
                                checked={r.gewonnen[p] === true}
                                onChange={() =>
                                  updateRound(i, "gewonnen", {
                                    ...r.gewonnen,
                                    [p]: true,
                                  })
                                }
                              />{" "}
                              gewonnen
                            </label>{" "}
                            <label>
                              <input
                                type="radio"
                                name={`speciaal-${i}-${p}`}
                                checked={r.gewonnen[p] === false}
                                onChange={() =>
                                  updateRound(i, "gewonnen", {
                                    ...r.gewonnen,
                                    [p]: false,
                                  })
                                }
                              />{" "}
                              verloren
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  {players.map((p) => (
                    <td
                      key={p}
                      style={{
                        textAlign: "center",
                        color:
                          r.punten?.[p] > 0
                            ? "green"
                            : r.punten?.[p] < 0
                            ? "red"
                            : "#333",
                      }}
                    >
                      {r.punten?.[p] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot style={{ backgroundColor: "#f1f1f1" }}>
              <tr>
                <td colSpan={4}>
                  <strong>Totaal</strong>
                </td>
                {players.map((p) => (
                  <td key={p} style={{ textAlign: "center" }}>
                    <strong>{totaal(p)}</strong>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>

          <div style={{ marginTop: 12 }}>
            <button
              onClick={addRound}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
              }}
            >
              + Slag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
