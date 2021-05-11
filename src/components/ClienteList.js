import * as React from "react";
import { List, Datagrid, TextField, EmailField, NumberField, Create } from 'react-admin';
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';
import { Filter, ReferenceInput, SelectInput } from 'react-admin';

export const ClienteList = props => (
    <List filters={<CLienteFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="Nome" source="name" />
            <EmailField source="email" />
            <TextField source="telefone" />
            <TextField label="Endereço" source="endereco" />
            <NumberField source="diasParaPagar" />
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
            {/* <DateInput source="createdAt" /> */}
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

const CLienteFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Cliente" source="id" reference="clientes">
            <SelectInput optionText="name" alwaysOn/>
        </ReferenceInput>
    </Filter>
);
