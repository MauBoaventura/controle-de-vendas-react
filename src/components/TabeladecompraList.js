import * as React from "react";
import { List, Edit, Create, SimpleForm, Datagrid, TextField, NumberField, NumberInput, TextInput} from 'react-admin';

export const TabeladecompraList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="Nome" source="name" />
            <NumberField label="Valor de compra" source="valorCompra" />
        </Datagrid>
    </List>
);

export const TabeladecompraEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="valorCompra" />
        </SimpleForm>
    </Edit>
);

export const TabeladecompraCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput options={{label:"Nome"}} source="name" />
            <NumberInput source="valorCompra" />
        </SimpleForm>
    </Create>
);