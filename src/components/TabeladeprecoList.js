import * as React from "react";
import { List, Edit, Create, SimpleForm, Datagrid, TextField, NumberField, DateField, DateInput, NumberInput, TextInput } from 'react-admin';

export const TabeladeprecoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <NumberField source="valor" />
            <DateField source="dataInicio" />
            <DateField source="dataFim" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <TextField source="deletedAt" />
        </Datagrid>
    </List>
);

export const TabeladeprecoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="valor" />
            <DateInput source="dataInicio" />
            <DateInput source="dataFim" />
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
            {/* <TextInput disabled  source="id" /> */}
            <TextInput source="name" />
            <NumberInput source="valor" />
            <DateInput source="dataInicio" />
            <DateInput source="dataFim" />
        </SimpleForm>
    </Create>
}