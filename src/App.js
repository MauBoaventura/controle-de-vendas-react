import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {ClienteEdit, ClienteList, ClienteCreate, } from './components/UserList'
import { TabeladecompraList, TabeladecompraCreate, TabeladecompraEdit } from './components/TabeladecompraList'
import { TabeladeprecoList, TabeladeprecoEdit, TabeladeprecoCreate } from './components/TabeladeprecoList'
import { PedidoList, PedidoEdit, PedidoCreate } from './components/PedidoList'

const dataProvider = jsonServerProvider('http://localhost:3035');

const App = () => (
  <Admin dataProvider={dataProvider}>
    {/* <Route path='/login' exact component={Login}></Route> */}
    <Resource name="clientes" options={{ label: 'Clientes' }} list={ClienteList} edit={ClienteEdit} create={ClienteCreate} />
    <Resource name="tabeladeprecos" options={{ label: 'Tabela de preços' }} list={TabeladeprecoList} edit={TabeladeprecoEdit} create={TabeladeprecoCreate} />
    <Resource name="tabeladecompras" options={{ label: 'Preços de compra' }} list={TabeladecompraList} edit={TabeladecompraEdit} create={TabeladecompraCreate} />
    <Resource name="pedidos" options={{ label: 'Pedidos' }} list={PedidoList} edit={PedidoEdit} create={PedidoCreate} />
  </Admin>
);
export default App;