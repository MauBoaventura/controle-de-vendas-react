import * as React from "react";
import { useState, useEffect } from 'react';
import { List, Edit, Create, Filter, ChipField, ReferenceField, SimpleForm, Datagrid, TextField, NumberField, DateField } from 'react-admin';
import { TextInput, ReferenceInput, SelectInput, DateInput, NumberInput } from 'react-admin';
import { client } from "../services";
import { makeStyles, Chip } from '@material-ui/core';

const frete_por_quilo = 0.2;

const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));
const QuickFilter = ({ label }) => {
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={(label)} />;
};

const moment = require('moment')


const choices = [{ id: 'PAGO', name: 'PAGO' }, { id: 'ABRT', name: 'ABRT' }, { id: 'VENC', name: 'VENC' }]

export const PedidoList = props => (
    <List filters={<PedidoFilter />}{...props}>
        <Datagrid rowClick="edit">
            <DateField label="Data do pedido" source="dataPedido" />
            <ChipField source="situacao" />
            <ReferenceField source="clienteId" reference="clientes"><TextField source="name" /></ReferenceField>
            <ReferenceField label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras"><TextField source="valorCompra" /></ReferenceField>
            <DateField source="dataVencimentoPedido" />
            <NumberField label="Volumes" source="quant_caixa" />
            <NumberField label="Quilos" source="quilo" />
            <ReferenceField label="Preço de venda" source="tabelaId" reference="tabeladeprecos"><TextField source="valor" /></ReferenceField>
            {/* <NumberField source="desconto" /> */}
            {/* <NumberField source="frete" /> */}
            <NumberField source="totalDaNota" />
            <NumberField source="valorLucro" />
        </Datagrid>
    </List>
);

export const PedidoEdit = props => {
    const [dataVencimento, setDataVencimento] = useState('');
    const [totalDaNota, setTotalDaNota] = useState(['']);
    const [frete, setFrete] = useState(['']);
    const [valorLucro, setValorLucro] = useState(['']);
    useEffect(() => {
        async function loadAll() {
            try {
                var id = (document.getElementById('id').value)
                var pedido = (await client.get("/pedidos/" + id));
                const time = moment(pedido.data.dataVencimentoPedido).format("YYYY-MM-DD");
                setDataVencimento(time);
                setFrete(pedido.data.frete)
                setTotalDaNota(pedido.data.totalDaNota)
                setValorLucro(pedido.data.valorLucro)
            } catch (error) {
                console.error(error)
            }
        }
        loadAll()
    }, [])

    const mudarDataVencimento = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var clienteId = document.getElementsByName('clienteId')[0].value

                var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;

                var time = moment(event.target.value).add(diasParaPagar || 0, 'days').format("YYYY-MM-DD");
                setDataVencimento
                    (time);
            }

        } catch (error) {

        }
    }

    const mudarValorTotal = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var desconto = document.getElementById('desconto').value;
                var totalDaNota = quilo * (valorDeVenda - frete_por_quilo) - desconto
                setTotalDaNota(parseFloat(totalDaNota.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorFrete = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var quilo = document.getElementById('quilo').value;

                var frete = quilo * frete_por_quilo
                setFrete(parseFloat(frete.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorLucro = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;
                var totalDaNota = document.getElementById('totalDaNota').value;

                var lucro = totalDaNota - (valorCompra * quilo)
                setValorLucro(parseFloat(lucro.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value,
        totalDaNota: document.getElementById('totalDaNota').value,
        valorLucro: document.getElementById('valorLucro').value
    });

    return (
        <Edit {...props} transform={transform}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaId" reference="tabeladeprecos" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} ><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput source="tabelaCompraId" reference="tabeladecompras" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} ><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <SelectInput source="situacao" defaultChecked={[1]} choices={choices} />
                <NumberInput source="quant_caixa" />
                <NumberInput source="quilo" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} />
                <NumberInput source="desconto" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorLucro(event);
                }} />
                <NumberInput disabled source="frete" options={{ value: frete }} />
                <NumberInput disabled source="totalDaNota" options={{ value: totalDaNota }} />
                <NumberInput disabled source="valorLucro" options={{ value: valorLucro }} />
            </SimpleForm>
        </Edit>
    );
}

export const PedidoCreate = props => {
    const [erro] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [totalDaNota, setTotalDaNota] = useState(['']);
    const [frete, setFrete] = useState(['']);
    const [valorLucro, setValorLucro] = useState(['']);
    useEffect(() => {
        async function loadAll() {
            try {
                var id = (document.getElementById('id').value)
                var pedido = (await client.get("/pedidos/" + id));
                const time = moment(pedido.data.dataVencimentoPedido).format("YYYY-MM-DD");
                setDataVencimento(time);
                setFrete(pedido.data.frete)
                setTotalDaNota(pedido.data.totalDaNota)
                setValorLucro(pedido.data.valorLucro)
            } catch (error) {
                console.error(error)
            }
        }
            loadAll()
    }, [erro])

    const mudarDataVencimento = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var clienteId = document.getElementsByName('clienteId')[0].value

                var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;

                var time = moment(event.target.value).add(diasParaPagar || 0, 'days').format("YYYY-MM-DD");
                setDataVencimento
                    (time);
            }

        } catch (error) {

        }
    }

    const mudarValorTotal = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var desconto = document.getElementById('desconto').value;
                var totalDaNota = quilo * (valorDeVenda - frete_por_quilo) - desconto
                setTotalDaNota(parseFloat(totalDaNota.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorFrete = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var quilo = document.getElementById('quilo').value;

                var frete = quilo * frete_por_quilo
                setFrete(parseFloat(frete.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorLucro = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;
                var totalDaNota = document.getElementById('totalDaNota').value;

                var lucro = totalDaNota - (valorCompra * quilo)
                setValorLucro(parseFloat(lucro.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value,
        totalDaNota: document.getElementById('totalDaNota').value,
        valorLucro: document.getElementById('valorLucro').value
    });

    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de venda" source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <SelectInput source="situacao" choices={choices} />
                <NumberInput source="quant_caixa"/>
                <NumberInput source="quilo" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} />
                <NumberInput source="desconto" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorLucro(event);
                }} />
                <NumberInput disabled source="frete" options={{ value: frete }} />
                <NumberInput disabled source="totalDaNota" options={{ value: totalDaNota }} />
                <NumberInput disabled source="valorLucro" options={{ value: valorLucro }} />
            </SimpleForm>
        </Create>
    );
}

const PedidoFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        <ReferenceInput label="Cliente" source="clienteId" reference="clientes">
            <SelectInput optionText="name" alwaysOn />
        </ReferenceInput>
        <QuickFilter source="dataVencimento" label="Vencimento Hoje" defaultValue={moment().format("YYYY-MM-DD")} />
        <DateInput label="Data do pedido" source="dataPedido" />
    </Filter>
);