import * as React from "react";
import { List, Datagrid, TextField, EmailField, NumberField, DateField, Create } from 'react-admin';
import { Edit, SimpleForm, TextInput, NumberInput, DateInput } from 'react-admin';
import { Filter, ReferenceInput, SelectInput } from 'react-admin';

export const ClienteList = props => (
    <List filters={<PostFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="telefone" />
            <TextField source="endereco" />
            <NumberField source="diasParaPagar" />
            <DateField source="createdAt" />
            {/* <DateField source="updatedAt" />
            <DateField source="deletedAt" /> */}
        </Datagrid>
    </List>
);

export const ClienteEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="telefone" />
            <TextInput source="endereco" />
            <NumberInput source="diasParaPagar" />
            <DateInput source="createdAt" />
        </SimpleForm>
    </Edit>
);

export const ClienteCreate = (props) => {

    const transform = data => ({
        ...data,
        id: 1
    });

    return <Create {...props} transform={transform}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="telefone" />
            <TextInput source="endereco" />
            <NumberInput source="diasParaPagar" />
        </SimpleForm>
    </Create>
}

const PostFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Cliente" source="id" reference="clientes">
            <SelectInput optionText="name" alwaysOn/>
        </ReferenceInput>
    </Filter>
);
