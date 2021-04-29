import * as React from "react";
import { List, Edit, Create, SimpleForm, Datagrid, TextField, NumberField, NumberInput, TextInput } from 'react-admin';

export const TabeladeprecoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="Nome" source="name" />
            <NumberField label="Valor de venda" source="valor" />
        </Datagrid>
    </List>
);

export const TabeladeprecoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="valor" />
        </SimpleForm>
    </Edit>
);

export const TabeladeprecoCreate = (props) => {

    const transform = data => ({
        ...data,
        id: null
    });

    return <Create {...props} transform={transform}>
        <SimpleForm>
            <TextInput source="name" />
            <NumberInput source="valor" />
        </SimpleForm>
    </Create>
}