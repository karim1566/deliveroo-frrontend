import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logo from "./assets/img/logo-teal.svg";
function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState([]);

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

  const handleclick = (element) => {
    const newpanier = [...counter];
    const newid = newpanier.find((elem) => elem.id === element.id);
    newid.id
      ? newpanier.counter++
      : newpanier.push({
          id: element.id,
          title: element.title,
          price: element.price,
          counter: 1,
        });

    setCounter(newpanier);
  };
  const frais = 2.5;
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
                          <div
                            className="blocP"
                            onClick={() => {
                              handleclick(element);
                            }}
                          >
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
                console.log(counter);
                const operation = () => {
                  const newcounter = [...counter];
                  newcounter[index].counter = newcounter[index].counter + 1;
                  setCounter(newcounter);
                };
                const soustraction = () => {
                  const newcounter = [...counter];
                  newcounter[index].counter = newcounter[index].counter - 1;
                  setCounter(newcounter);
                };
                // cd
                return (
                  <article key={index}>
                    <div className="disp">
                      <div className="add">
                        <button className="rond" onClick={soustraction}>
                          -
                        </button>
                        <p>{element.counter}</p>
                        <button className="rond" onClick={operation}>
                          +
                        </button>
                      </div>
                      <h3>{element.title}</h3>
                      <h3>{element.counter * element.price}</h3>
                    </div>
                  </article>
                );
              })}

              <div className="sous">
                <p>{counter[0] ? "Sous-total" : ""}</p>
                <p>{counter[0] ? "total" : ""}</p>
              </div>
              <div className="frais">
                <p>{counter[0] ? "frais de livraison" : ""}</p>
                <p>{counter[0] ? frais : ""} € </p>
              </div>
            </div>
            <p className="panierP">
              {!counter[0] ? "Votre panier est vide" : ""}
            </p>
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
