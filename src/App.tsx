import { useEffect, useState } from "react";

import List from "./components/List/List";

import { getAllData } from "./services/public";

import { TypeHostData, TypeNewApp, TypeProyecto } from "./types/types";

import { newApp } from "./utils/const";
import { orderDataByHost, sortByApdex } from "./utils/functions";

import "./App.css";

const displayCRUD = true;

function App() {
  const [dataByHost, setDataByHost] = useState<TypeHostData["data"]>({});
  const [change, setChange] = useState<boolean>(false);

  const addAppToHosts = ({ host, app }: TypeNewApp) => {
    //TODO apIndex
    dataByHost[host].push(app);
    sortByApdex(dataByHost[host]);
    setDataByHost(dataByHost);
    setChange(!change);
  };

  const removeAppFromHosts = ({ host, app }: TypeNewApp) => {
    //TODO apIndex
    const index = dataByHost[host].findIndex(
      (proyecto: TypeProyecto) => proyecto.name === app.name
    );
    dataByHost[host].splice(index, 1);
    //sortByApdex(dataByHost[host]); No es necesario solo estas removiendo, se comenta por si apIndex hace otra cosa.
    setDataByHost(dataByHost);
    setChange(!change);
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllData();
      const newData = JSON.parse(data.data);
      sortByApdex(newData.data);
      const tempData = orderDataByHost(newData.data);
      setDataByHost(tempData);
    };
    getData();
  }, []);

  return (
    <div className="App">
      {displayCRUD && (
        <div>
          <div onClick={() => addAppToHosts(newApp)}>Agregar</div>
          <div onClick={() => removeAppFromHosts(newApp)}>Eliminar</div>
        </div>
      )}
      <List data={dataByHost} />
    </div>
  );
}

export default App;
