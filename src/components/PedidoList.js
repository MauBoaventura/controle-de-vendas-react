import * as React from "react";
import { List, Edit, Create, ReferenceField, SimpleForm, Datagrid, TextField, NumberField, DateField } from 'react-admin';
import { TextInput, ReferenceInput, SelectInput, DateInput, NumberInput} from 'react-admin';

export const PedidoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <ReferenceField source="clienteId" reference="clientes"><TextField source="name" /></ReferenceField>
            {/* <ReferenceField source="tabelaCompraId" reference="tabeladecompras"><TextField source="navalorme" /></ReferenceField> */}
            <DateField source="dataPedido" />
            {/* <DateField source="dataVencimentoPedido" /> */}
            <NumberField source="quant_caixa" />
            <NumberField source="quilo" />
            <ReferenceField options={{ label: 'Clientes' }}source="tabelaId" reference="tabeladeprecos"><TextField source="valor" /></ReferenceField>
            <NumberField source="desconto" />
            <NumberField source="totalDaNota" />
            <TextField source="situacao" />
            <NumberField source="valorLucro" />
            {/* <DateField source="createdAt" />
            <TextField source="updatedAt" />
            <TextField source="deletedAt" /> */}
        </Datagrid>
    </List>
);


export const PedidoEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
            <DateInput source="dataPedido" value={Date.now()}/>
            <DateInput source="dataVencimentoPedido" />
            <NumberInput source="quant_caixa"/>
            <NumberInput source="quilo"/>
            <NumberInput source="desconto"/>
            <NumberInput source="totalDaNota"/>
            <TextInput source="situacao"/>
            <NumberInput source="valorLucro"/>
        </SimpleForm>
    </Edit>
);

export const PedidoCreate = props => (
    <Create {...props}>
         <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
            <ReferenceInput source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
            <DateInput source="dataPedido" value={Date.now()}/>
            <DateInput source="dataVencimentoPedido" value={0}/>
            <NumberInput source="quant_caixa" value={0} />
            <NumberInput source="quilo" value={0} />
            <NumberInput source="desconto" value={0} />
            <NumberInput source="totalDaNota" value={0} />
            <TextInput source="situacao" value={0}/>
            <NumberInput source="valorLucro" value={0} />
        </SimpleForm>
    </Create>
);