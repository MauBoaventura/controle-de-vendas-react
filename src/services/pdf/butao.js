import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressao';
import moment from 'moment';
import { client } from "../";

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const relatorioListaCobrancaDiaria = async () => {

    //Buscar dados da API 
    // Depois fazer uma consulta e jogar o processamento para a API
    var pedido = (await client.get("/relatorioDiario"));
    var data_hoje = moment().format("YYYY-MM-DD")

    var pedidos_vencendo_hoje = pedido.data.filter((element) => {
        let diaVencimento = moment(element.dataVencimentoPedido).format("YYYY-MM-DD")
        // console.log(diaVencimento)
        // console.log(diaVencimento === data_atual)
        return diaVencimento === data_hoje;
    }).map((el) => {
        el.quilo = el.quilo.toLocaleString('pt-BR', { style: 'decimal'})+ ' kg';
        el.valor = el.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.desconto = el.desconto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.totalDaNota = el.totalDaNota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        el.dataVencimentoPedido = moment(el.dataVencimentoPedido).format("DD-MM-YYYY")
        el.dataPedido = moment(el.dataPedido).format("DD-MM-YYYY")
        return el
    });

    if (pedidos_vencendo_hoje.length > 0) {
        const classeImpressao = new Impressao(pedidos_vencendo_hoje);
        const documento = await classeImpressao.PreparaDocumento();
        pdfMake.createPdf(documento)
            // .download();
            .open({}, window.open('', '_blank'));
        // .print();
    } else {
        console.error("Não ha pedidos vencendo hoje");
    }
}

function Butao(props) {
    return (<>
        <button className="props" onClick={relatorioListaCobrancaDiaria}>
            Lista de Cobrança de hoje - {moment().format("DD/MM/YYYY")}
        </button>
        <button className="props" onClick={relatorioListaCobrancaDiaria}>
            Visualizar documento
        </button>
    </>
    )
}

export default Butao;