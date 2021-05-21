
export class Impressao {

  constructor(dadosParaImpressao) {
    this.dadosParaImpressao = dadosParaImpressao;
  }

  async PreparaDocumento() {
    const corpoDocumento = this.CriaCorpoDocumento();
    const documento = this.GerarDocumento(corpoDocumento);
    return documento;
  }

  CriaCorpoDocumento() {
    const header = [
      { text: 'Nome Cliente', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Quilos', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Preço/Kg', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Desconto', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Total da nota', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do pedido', bold: true, fontSize: 9, margin: [0, 4, 0, 0] },
      { text: 'Data do Vencimento', bold: true, fontSize: 9, margin: [0, 4, 0, 0] }
    ];
    const body = this.dadosParaImpressao.map((prod) => {
      return [
        { text: prod.name, fontSize: 8 },
        { text: prod.quilo, fontSize: 8 },
        { text: prod.valor, fontSize: 8 },
        { text: prod.desconto, fontSize: 8 },
        { text: prod.totalDaNota, fontSize: 8 },
        { text: prod.dataPedido, fontSize: 8 },
        { text: prod.dataVencimentoPedido, fontSize: 8 },
      ];
    });

    const lineHeader = [
      {
        text:
          '__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
        alignment: 'center',
        fontSize: 5,
        colSpan: 7,
      },
      {},
      {},
    ];

    let content = [header, lineHeader];
    content = [...content, ...body];
    return content;
  }

  GerarDocumento(corpoDocumento) {
    const documento = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      header: function () {
        return {
          margin: [14, 12, 14, 0],
          layout: 'noBorders',
          table: {
            widths: ['*'],
            body: [
              [
                { text: 'RELATÓRIO DE COBRANÇA DIARIA', style: 'reportName' }
              ]
            ],
          },
        };
      },
      content: [
        {
          layout: 'noBorders',
          table: {
            headerRows: 1,
            widths: [150, 50,50,50,100,50,70],

            body: corpoDocumento
          }
        },
      ],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['auto'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© MauBoa_Softwares',
                    fontSize: 7,
                    alignment: 'left',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        }
      },

    };
    return documento;
  }
}