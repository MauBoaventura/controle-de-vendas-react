import * as React from "react";
import { List, Edit, Create, SimpleForm, Datagrid, TextField, NumberField, DateField, DateInput, NumberInput, TextInput} from 'react-admin';

export const TabeladecompraList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <NumberField source="valorCompra" />
            <DateField source="dataInicio" />
            <DateField source="dataFim" />
            <TextField source="situacao" />
            {/* <DateField source="createdAt" />
            <TextField source="updatedAt" />
            <TextField source="deletedAt" /> */}
        </Datagrid>
    </List>
);

export const TabeladecompraEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <NumberInput source="valorCompra" />
            <TextInput source="situacao" />
            <DateInput source="dataInicio" />
            <DateInput source="dataFim" />
        </SimpleForm>
    </Edit>
);

export const TabeladecompraCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput options={{label:"Nome"}} source="name" />
            <NumberInput source="valorCompra" />
            <TextInput source="situacao" />
            <DateInput source="dataInicio" />
            <DateInput source="dataFim" />
        </SimpleForm>
    </Create>
);