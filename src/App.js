import * as React from "react";
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { ClienteEdit, ClienteList, ClienteCreate, } from './components/ClienteList'
import { TabeladecompraList, TabeladecompraCreate, TabeladecompraEdit } from './components/TabeladecompraList'
import { TabeladeprecoList, TabeladeprecoEdit, TabeladeprecoCreate } from './components/TabeladeprecoList'
import { PedidoList, PedidoEdit, PedidoCreate } from './components/PedidoList'
import { RelatorioList } from './components/Relatorio'

import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import MyLoginPage from './pages/Login/MyLoginPage'
import MyLogoutButton from './pages/Logout/MyLogoutButton'
import authProvider from './services/authProvider' 

const messages = {
  'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br');


const dataProvider = jsonServerProvider(process.env.NODE_ENV !== 'production'?'http://localhost:3035':'http://mauboa.com.br');
// const dataProvider = jsonServerProvider(process.env.NODE_ENV !== 'production'?'http://localhost:3035':'https://controledevenda.herokuapp.com');

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={MyLoginPage} logoutButton={MyLogoutButton} i18nProvider={i18nProvider}>
  {/* // <Admin dataProvider={dataProvider} loginPage={MyLoginPage} logoutButton={MyLogoutButton} i18nProvider={i18nProvider}>
  // <Admin dataProvider={dataProvider} authProvider={authProvider}  i18nProvider={i18nProvider}> */}
    <Resource name="clientes" options={{ label: 'Clientes' }} list={ClienteList} edit={ClienteEdit} create={ClienteCreate} />
    <Resource name="tabeladeprecos" options={{ label: 'Valor de venda' }} list={TabeladeprecoList} edit={TabeladeprecoEdit} create={TabeladeprecoCreate} />
    <Resource name="tabeladecompras" options={{ label: 'Valor de compra' }} list={TabeladecompraList} edit={TabeladecompraEdit} create={TabeladecompraCreate} />
    <Resource name="pedidos" options={{ label: 'Pedidos' }} list={PedidoList} edit={PedidoEdit} create={PedidoCreate} />
    <Resource name="relatorios" options={{ label: 'Relatorios' }} list={RelatorioList} />
  </Admin>
);
export default App;