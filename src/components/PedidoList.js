import * as React from "react";
import { useState, useEffect } from 'react';
import { List, Edit, Create, Filter, ChipField, ReferenceField, SimpleForm, Datagrid, TextField, NumberField, DateField } from 'react-admin';
import { TextInput, ReferenceInput, SelectInput, DateInput, NumberInput } from 'react-admin';
import { client } from "../services";
// import { makeStyles, Chip } from '@material-ui/core';

const frete_por_quilo = process.env.FRETE_POR_QUILO || 0.2;

// const useQuickFilterStyles = makeStyles(theme => ({
//     chip: {
//         marginBottom: theme.spacing(1),
//     },
// }));
// const QuickFilter = ({ label }) => {
//     const classes = useQuickFilterStyles();
//     return <Chip className={classes.chip} label={(label)} />;
// };

const moment = require('moment')


const choices = [{ id: 'PAGO', name: 'PAGO' }, { id: 'ABRT', name: 'ABRT' }, { id: 'VENC', name: 'VENC' }]

export const PedidoList = props => (
    <List filters={<PedidoFilter />}{...props}>
        <div className="testee">
        <Datagrid rowClick="edit">
            <DateField label="Data do pedido" source="dataPedido" options={{ timeZone: 'UTC' }}/>
            <ChipField source="situacao" />
            <ReferenceField source="clienteId" reference="clientes"><TextField source="name" /></ReferenceField>
            <ReferenceField label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras"><TextField source="name" /></ReferenceField>
            <ReferenceField label="Preço de venda" source="tabelaId" reference="tabeladeprecos"><TextField source="name" /></ReferenceField>
            <DateField source="dataVencimentoPedido" options={{ timeZone: 'UTC' }}/>
            <NumberField source="quant_frango" />
            <NumberField source="quant_caixa" />
            <NumberField label="Quilos" source="quilo" />
            <NumberField label="Desconto" source="desconto" />
            {/* <NumberField source="frete" /> */}
            <NumberField source="totalDaNota" />
            <NumberField source="valorLucro" />
        </Datagrid>
        </div>
    </List>
);

export const PedidoEdit = props => {
    const [erro] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [totalDaNota, setTotalDaNota] = useState(['']);
    const [totalArrecadado, setTotalArrecadado] = useState(['']);
    const [pagamentoFornecedor, setPagamentoFornecedor] = useState(['']);
    const [frete, setFrete] = useState(['']);
    const [desconto, setDesconto] = useState(['']);
    const [valorLucro, setValorLucro] = useState(['']);
    useEffect(() => {
        async function loadAll() {
            try {
                var id = (document.getElementById('id').value)
                var pedido = (await client.get("/pedidos/" + id));
                const time = moment(pedido.data.dataVencimentoPedido).format("YYYY-MM-DD");
                setDataVencimento(time);
                setFrete(pedido.data.frete)
                setDesconto(pedido.data.desconto)
                setTotalDaNota(pedido.data.totalDaNota)
                setValorLucro(pedido.data.valorLucro)
                setPagamentoFornecedor(pedido.data.pagoFornecedor)
                setTotalArrecadado(pedido.data.totalArrecadado)
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
                setDataVencimento(time);
            }

        } catch (error) {

        }
    }

    const mudarPagamentoFornecedor = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;

                var pagamentoAoForncedor = quilo * (valorCompra)
                setPagamentoFornecedor(parseFloat(pagamentoAoForncedor.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorTotal = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var desconto = document.getElementById('desconto').value;
                var totalDaNota = quilo * (valorDeVenda) - desconto
                setTotalDaNota(parseFloat(totalDaNota.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorTotalArrecadado = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var totalDaNota = quilo * (valorDeVenda)
                setTotalArrecadado(parseFloat(totalDaNota.toFixed(2)));
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
            var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value
            var tabelaId = document.getElementsByName('tabelaId')[0].value

            var quilo = document.getElementById('quilo').value;
            var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;

            var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
            var desconto = document.getElementById('desconto').value;
            var totalDaNota = quilo * (valorDeVenda) - desconto

            var lucro = totalDaNota - (valorCompra * quilo)
            setValorLucro(parseFloat(lucro.toFixed(2)));

        } catch (error) {
            console.log(error)
        }
    }

    const mudarDesconto = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaId')[0].value
                
                var quilo_desconto = document.getElementById('quilo_desconto').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaCompraId)).data.valor;
                
                var desconto = quilo_desconto * valorDeVenda;
                setDesconto(parseFloat(desconto.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value,
        totalDaNota: document.getElementById('totalDaNota').value,
        valorLucro: document.getElementById('valorLucro').value,
        frete: document.getElementById('frete').value,
        desconto: document.getElementById('desconto').value
    });

    return (
        <Edit {...props} transform={transform}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de venda" source="tabelaId" reference="tabeladeprecos" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} ><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras" onChange={(event) => {
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                }} ><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <SelectInput source="situacao" defaultChecked={[1]} choices={choices} />
                <NumberInput source="quant_frango" />
                <NumberInput source="quant_caixa" />
                <NumberInput source="quilo" onChange={(event) => {
                    mudarPagamentoFornecedor(event);
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                    mudarValorTotalArrecadado(event)
                }} />
                <NumberInput label="Desconto em kg" source="quilo_desconto" onChange={(event) => {
                    mudarDesconto(event);
                    mudarValorTotal(event);
                    mudarValorLucro(event);
                    mudarValorTotalArrecadado(event);
                }} />
                <NumberInput disabled label="Desconto em reais" source="desconto" options={{ value: parseFloat(desconto) }} />
                <NumberInput disabled label="Gastos com frete" source="frete" options={{ value: parseFloat(frete) }} />
                <NumberInput disabled label="Valor pago com fornecedor" source="pagoFornecedor" options={{ value: parseFloat(pagamentoFornecedor) }} />
                <NumberInput disabled label="Total de sem desconto" source="totalArrecadado" options={{ value: parseFloat(totalArrecadado) }} />
                <NumberInput disabled label="Valor total recebido" source="totalDaNota" options={{ value: parseFloat(totalDaNota) }} />
                <NumberInput disabled label="Total lucrado" source="valorLucro" options={{ value: parseFloat(valorLucro) }} />
            </SimpleForm>
        </Edit>
    );
}

export const PedidoCreate = props => {
    // const [erro] = useState('');
    const [dataVencimento, setDataVencimento] = useState('');
    const [totalDaNota, setTotalDaNota] = useState(['']);
    const [totalArrecadado, setTotalArrecadado] = useState(['']);
    const [pagamentoFornecedor, setPagamentoFornecedor] = useState(['']);
    const [desconto, setDesconto] = useState(['']);
    const [frete, setFrete] = useState(['']);
    const [valorLucro, setValorLucro] = useState(['']);
    // useEffect(() => {
    //     async function loadAll() {
    //         try {
    //             var id = (document.getElementById('id').value)
    //             var pedido = (await client.get("/pedidos/" + id));
    //             const time = moment(pedido.data.dataVencimentoPedido).format("YYYY-MM-DD");
    //             setDataVencimento(time);
    //             setFrete(pedido.data.frete)
    //             setTotalDaNota(pedido.data.totalDaNota)
    //             setValorLucro(pedido.data.valorLucro)
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    //     loadAll()
    // }, [erro])

    const mudarDataVencimento = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var clienteId = document.getElementsByName('clienteId')[0].value

                var diasParaPagar = (await client.get("/clientes/" + clienteId)).data.diasParaPagar;

                var time = moment(event.target.value).add(diasParaPagar || 0, 'days').format("YYYY-MM-DD");
                setDataVencimento(time);
            }

        } catch (error) {

        }
    }

    const mudarPagamentoFornecedor = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;

                var pagamentoAoForncedor = quilo * (valorCompra)
                setPagamentoFornecedor(parseFloat(pagamentoAoForncedor.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorTotal = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var desconto = document.getElementById('desconto').value;
                var totalDaNota = quilo * (valorDeVenda) - desconto
                setTotalDaNota(parseFloat(totalDaNota.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const mudarValorTotalArrecadado = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaId = document.getElementsByName('tabelaId')[0].value

                var quilo = document.getElementById('quilo').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
                var totalDaNota = quilo * (valorDeVenda)
                setTotalArrecadado(parseFloat(totalDaNota.toFixed(2)));
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
            var tabelaCompraId = document.getElementsByName('tabelaCompraId')[0].value
            var tabelaId = document.getElementsByName('tabelaId')[0].value

            var quilo = document.getElementById('quilo').value;
            var valorCompra = (await client.get("/tabeladecompras/" + tabelaCompraId)).data.valorCompra;

            var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaId)).data.valor;
            var desconto = document.getElementById('desconto').value;
            var totalDaNota = quilo * (valorDeVenda) - desconto

            var lucro = totalDaNota - (valorCompra * quilo)
            setValorLucro(parseFloat(lucro.toFixed(2)));

        } catch (error) {
            console.log(error)
        }
    }

    const mudarDesconto = async (event) => {
        try {
            if (document.getElementById('clienteId') !== undefined) {
                var tabelaCompraId = document.getElementsByName('tabelaId')[0].value
                
                var quilo_desconto = document.getElementById('quilo_desconto').value;
                var valorDeVenda = (await client.get("/tabeladeprecos/" + tabelaCompraId)).data.valor;
                
                var desconto = quilo_desconto * valorDeVenda;
                setDesconto(parseFloat(desconto.toFixed(2)));
            }

        } catch (error) {
            console.log(error)
        }
    }

    const transform = data => ({
        ...data,
        dataVencimentoPedido: document.getElementById('dataVencimentoPedido').value,
        totalDaNota: document.getElementById('totalDaNota').value,
        pagoFornecedor: document.getElementById('pagoFornecedor').value,
        frete: document.getElementById('frete').value,
        totalArrecadado: document.getElementById('totalArrecadado').value,
        valorLucro: document.getElementById('valorLucro').value,
        desconto: document.getElementById('desconto').value
    });

    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                {/* <TextInput disabled source="id" /> */}
                <ReferenceInput source="clienteId" reference="clientes"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de venda" source="tabelaId" reference="tabeladeprecos"><SelectInput optionText="name" /></ReferenceInput>
                <ReferenceInput label="Preço de compra" source="tabelaCompraId" reference="tabeladecompras"><SelectInput optionText="name" /></ReferenceInput>
                <DateInput source="dataPedido" onChange={(event) => {
                    mudarDataVencimento(event);
                }} />
                <DateInput source="dataVencimentoPedido" options={{ value: dataVencimento }} />
                <SelectInput source="situacao" choices={choices} />
                <NumberInput source="quant_frango" />
                <NumberInput source="quant_caixa" />
                <NumberInput source="quilo" onChange={(event) => {
                    mudarPagamentoFornecedor(event);
                    mudarValorTotal(event);
                    mudarValorFrete(event)
                    mudarValorLucro(event)
                    mudarValorTotalArrecadado(event)
                }} />
                <NumberInput label="Desconto em kg" source="quilo_desconto" onChange={(event) => {
                    mudarDesconto(event);
                    mudarValorTotal(event);
                    mudarValorLucro(event);
                }} />
                <NumberInput disabled label="Desconto em reais" source="desconto" options={{ value: parseFloat(desconto) }} />
                <NumberInput disabled label="Gastos com frete" source="frete" options={{ value: parseFloat(frete) }} />
                <NumberInput disabled label="Valor pago com fornecedor" source="pagoFornecedor" options={{ value: parseFloat(pagamentoFornecedor) }} />
                <NumberInput disabled label="Total de sem desconto" source="totalArrecadado" options={{ value: parseFloat(totalArrecadado) }} />
                <NumberInput disabled label="Valor total recebido" source="totalDaNota" options={{ value: parseFloat(totalDaNota) }} />
                <NumberInput disabled label="Total lucrado" source="valorLucro" options={{ value: parseFloat(valorLucro) }} />
            </SimpleForm>
        </Create>
    );
}

const PedidoFilter = (props) => (
    <Filter {...props}>
        {/* <TextInput label="Search" source="q" alwaysOn /> */}
        {/* <ReferenceInput label="Cliente" source="clienteId" reference="clientes">
            <SelectInput optionText="name" alwaysOn />
        </ReferenceInput> */}
        {/* <QuickFilter source="dataVencimento" label="Vencimento Hoje" defaultValue={moment().format("YYYY-MM-DD")} /> */}
        <DateInput label="Data do pedido" source="dataPedido" />
    </Filter>
);