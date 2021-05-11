import * as React from "react";
import { List, Datagrid, TextField, EmailField, NumberField, SaveButton } from 'react-admin';
import Butao from "../services/pdf/butao";

export const RelatorioList = props => (
    <List component={Butao} {...props}>
        <Datagrid rowClick="edit">
            <SaveButton source="id" />
            <TextField label="Nome" source="name" />
            <EmailField source="email" />
            <TextField source="telefone" />
            <TextField label="Endereço" source="endereco" />
            <NumberField source="diasParaPagar" />
            {/* <DateField label="Criado em:" source="createdAt" /> */}
        </Datagrid>
    </List>
);
