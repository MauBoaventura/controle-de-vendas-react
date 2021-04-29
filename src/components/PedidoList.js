import * as React from "react";
import { useState, useEffect } from 'react';
import { List, Edit, Create, ChipField, ReferenceField, SimpleForm, Datagrid, TextField, NumberField, DateField } from 'react-admin';
import { TextInput, ReferenceInput, SelectInput, DateInput, NumberInput } from 'react-admin';
import { client } from "../services";

const moment = require('moment')


const choices = [{ id: 'PAGO', name: 'PAGO' }, { id: 'ABRT', name: 'ABRT' }, { id: 'VENC', name: 'VENC' }]

export const PedidoList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <DateField label="Data do pedido" source="dataPedido" />
            <ChipField source="situacao" />
            <ReferenceField source="clienteId" reference="clientes"><TextField source="name" /></ReferenceField>
            <ReferenceField label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras"><TextField source="valorCompra" /></ReferenceField>
            <DateField source="dataVencimentoPedido" />
            <NumberField label="Volumes" source="quant_caixa" />
            <NumberField label="Quilos" source="quilo" />
            <ReferenceField label="Preço de venda" source="tabelaId" reference="tabeladeprecos"><TextField source="dataVencimento" /></ReferenceField>
            <NumberField source="desconto" />
            <NumberField source="frete" />
            <NumberField source="totalDaNota" />
            {/* <NumberField source="valorLucro" /> */}-
            {/* <DateField source="createdAt" />
            <TextField source="updatedAt" />
            <TextField source="deletedAt" /> */}
        </Datagrid>
    </List>
);



export const PedidoEdit = props => {
    const [dataVencimento, setDataVencimento
    ] = useState(['']);
    useEffect(() => {
        async function loadAll() {
            try {
                if (document.getElementById('clienteId') !== undefined) {
                    var id = (document.getElementById('id').value)
                    var dataVencimentoPedido = (await client.get("/pedidos/" + id)).data.dataVencimentoPedido;
                    const time = moment(dataVencimentoPedido).format("YYYY-MM-DD");
                    setDataVencimento
                    (time);
                }
                if (dataVencimento !== undefined) {
                    var clienteId = document.getElementsByName('clienteId')[0].value
                    var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;
                    const time = moment(document.getElementById('dataPedido').value).add(diasParaPagar || 0, 'days').format("YYYY-MM-DD");
                    setDataVencimento
                    (time);

                }
            } catch (error) {

            }
        }
        loadAll()
    },[])

    const mudarDataVencimento = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var clienteId = document.getElementsByName('clienteId')[0].value
                
                var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;
                
                var time = moment(event.target.value).add(diasParaPagar||0, 'days').format("YYYY-MM-DD");
                console.log(dataVencimento);
                setDataVencimento
                (time);
            }

        } catch (error) {

        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value
    });

    return (
        <Edit {...props} transform={transform}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <NumberInput source="quant_caixa" />
                <NumberInput source="quilo" />
                <NumberInput source="desconto" />
                <NumberInput source="frete" />
                <NumberInput source="totalDaNota" />
                <SelectInput source="situacao" defaultChecked={[1]} choices={choices} />
                <NumberInput source="valorLucro" />
            </SimpleForm>
        </Edit>
    );
}

export const PedidoCreate = props => {
    const [dataVencimento, setDataVencimento
    ] = useState(['']);
    useEffect(() => {
        async function loadAll() {
            try {
                if (document.getElementById('clienteId') !== undefined) {
                    var id = (document.getElementById('id').value)
                    var dataVencimentoPedido = (await client.get("/pedidos/" + id)).data.dataVencimentoPedido;
                    const time = moment(dataVencimentoPedido).format("YYYY-MM-DD");
                    setDataVencimento
                    (time);
                }
                if (dataVencimento !== undefined) {
                    var clienteId = document.getElementsByName('clienteId')[0].value
                    var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;
                    const time = moment(document.getElementById('dataPedido').value).add(diasParaPagar || 0, 'days').format("YYYY-MM-DD");
                    setDataVencimento
                    (time);

                }
            } catch (error) {

            }
        }
        loadAll()
    },[])

    const mudarDataVencimento = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var clienteId = document.getElementsByName('clienteId')[0].value
                
                var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;
                
                var time = moment(event.target.value).add(diasParaPagar||0, 'days').format("YYYY-MM-DD");
                console.log(dataVencimento);
                setDataVencimento
                (time);
            }

        } catch (error) {

        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value
    });

    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <NumberInput source="quant_caixa" value={0} />
                <NumberInput source="quilo" value={0} />
                <NumberInput source="desconto" value={0} />
                <NumberInput source="frete" value={0} />
                <NumberInput source="totalDaNota" value={0} />
                <SelectInput source="situacao" choices={choices} />
                <NumberInput source="valorLucro" value={0} />
            </SimpleForm>
        </Create>
    );
}