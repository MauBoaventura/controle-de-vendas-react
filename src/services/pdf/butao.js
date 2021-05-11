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
    });

    if (pedidos_vencendo_hoje.length > 0) {
        console.log(pedidos_vencendo_hoje)
    }else{
        console.error("Não ha pedidos vencendo hoje");
    }
    


    const classeImpressao = new Impressao(pedidos_vencendo_hoje);
    const documento = await classeImpressao.PreparaDocumento();
    pdfMake.createPdf(documento)
    // .download();
    .open({}, window.open('', '_blank'));
    // .print();
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