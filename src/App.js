import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState([]);
  const [menu, setMenu] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--q5p6j62kpgtk.code.run/"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleclick = () => {
    if (counter < 1) {
      const newcounter = [...counter];
      newcounter.push(1);
      setCounter(newcounter);
    } else if (counter >= 1) {
      const newcounter = [...counter];
      newcounter.map((item, index) => {
        newcounter[index] = newcounter[index] + 1;
        setCounter(newcounter);
      });
    }
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <header>
        <div className="topHeader">
          <img className="logo" src={logo} alt=""></img>
        </div>
        <section className="bottomHeader">
          <div className="bottomleft">
            <h1>{data.restaurant.name}</h1>
            <p className="bottomP">{data.restaurant.description}</p>
          </div>
          <img className="bottomimg" src={data.restaurant.picture} alt=""></img>
        </section>
      </header>
      <main>
        <div className="blocB">
          <div>
            {data.categories.map((element, index) => {
              // const name = element.name;

              return (
                <div className="menusec" key={index}>
                  <h2>{element.name}</h2>
                  <section className="sect">
                    {element.meals.map((element, index) => {
                      return (
                        <div key={element.id} className="blocG">
                          <div className="blocP" onClick={handleclick}>
                            <h4>{element.title}</h4>
                            <p>{element.description}</p>
                            <h3>
                              {element.price} €{"  "}
                              <span>
                                {element.popular ? "    ⭐️ Populaire" : ""}
                              </span>
                            </h3>
                          </div>
                          <img
                            className={element.picture ? "picture" : ""}
                            src={element.picture}
                            alt=""
                          ></img>
                        </div>
                      );
                    })}
                  </section>
                </div>
              );
            })}
          </div>
          <div className="panier">
            <button className={counter[0] ? "panierv" : "button"}>
              Valider votre parnier
            </button>
            <div>
              {counter.map((element, index) => {
                const operation = () => {
                  const newcounter = [...counter];
                  newcounter[index] = newcounter[index] + 1;
                  setCounter(newcounter);
                };
                const soustraction = () => {
                  const newcounter = [...counter];
                  newcounter[index] = newcounter[index] - 1;
                  setCounter(newcounter);
                };
                // cd
                return (
                  <article key={index}>
                    <div className="add">
                      <button onClick={soustraction}>-</button>
                      <p>{element}</p>
                      <button onClick={operation}>+</button>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="panierP">Votre panier est vide</p>
          </div>
        </div>
      </main>
      <footer>{counter}</footer>
    </>
  );
}

export default App;
