import * as React from "react";
import { List, Datagrid} from 'react-admin';
import Butao from "../services/pdf/butao";

export const RelatorioList = props => (
    <List component={Butao} {...props}>
        <Datagrid rowClick="edit">
        </Datagrid>
    </List>
);
